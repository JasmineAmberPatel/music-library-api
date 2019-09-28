const Artist = require('../src/models/artist');
const Album = require('../src/models/album');

describe('/albums', () => {
  let artist;

  beforeEach((done) => {
    Artist.create({
      name: 'Tame Impala',
      genre: 'Rock',
    }, (error, document) => {
      artist = document;
      done();
    });
  });

  afterEach((done) => {
    Artist.deleteMany({}, () => {
      Album.deleteMany({}, () => {
        done();
      });
    });
  });

  describe('POST /artists/:artistId/albums', () => {
    it('creates a new album for a given artist', (done) => {
      chai.request(server)
        .post(`/artists/${artist._id}/albums`)
        .send({
          name: 'InnerSpeaker',
          year: 2010,
        })
        .end((error, res) => {
          expect(error).to.equal(null);
          expect(res.status).to.equal(201);

          Album.findById(res.body._id, (err, album) => {
            expect(err).to.equal(null);
            expect(album.name).to.equal('InnerSpeaker');
            expect(album.year).to.equal(2010);
            expect(album.artist).to.eql(artist._id);
            done();
          });
        });
    });

    it('returns a 404 and does not create an album if the artist does not exist', (done) => {
      chai.request(server)
        .post('/artists/1234/albums')
        .send({
          name: 'InnerSpeaker',
          year: 2010,
        })
        .end((error, res) => {
          expect(error).to.equal(null);
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal('The artist could not be found.');

          Album.find({}, (err, albums) => {
            expect(err).to.equal(null);
            expect(albums).to.have.lengthOf(0);
            done();
          });
        });
    });
  });

  describe('with albums in database', () => {
    let albums;
    beforeEach((done) => {
      Promise.all([
        Album.create({ name: 'InnerSpeaker', year: 2010 }),
        Album.create({ name: 'Saturn', year: 2018 }),
        Album.create({ name: 'DAMN', year: 2017 }),
      ]).then((documents) => {
        albums = documents;
        done();
      });
    });
    describe('GET /albums', () => {
      it('gets all album records', (done) => {
        chai.request(server)
          .get('/artists/:artistId/albums')
          .end((err, res) => {
            expect(err).to.equal(null);
            expect(res.status).to.equal(200);
            expect(res.body).to.have.lengthOf(3);

            res.body.forEach((album) => {
              const expected = albums.find(a => a._id.toString() === album._id);
              expect(album.name).to.equal(expected.name);
              expect(album.year).to.equal(expected.year);
            });
            done();
          });
      });
    });
    describe('PATCH /albums/:albumId', () => {
      it('updates album name by id', (done) => {
        const album = albums[0];
        chai.request(server)
          .patch(`/albums/${album._id}`)
          .send({ name: 'Assume Form' })
          .end((err, res) => {
            expect(err).to.equal(null);
            expect(res.status).to.equal(200);
            Album.findById(album._id, (err, updatedAlbum) => {
              expect(updatedAlbum.name).to.equal('Assume Form');
              done();
            });
          });
      });

      it('returns a 404 if the album does not exist', (done) => {
        chai.request(server)
          .patch('/albums/12345')
          .send({ name: 'Fishfinger sandwich' })
          .end((err, res) => {
            expect(err).to.equal(null);
            expect(res.status).to.equal(404);
            expect(res.body.error).to.equal('The album could not be found.');
            done();
          });
      });
    });
    describe('DELETE /albums/:albumId', () => {
      it('deletes album record by id', (done) => {
        const album = albums[0];
        chai.request(server)
          .delete(`/albums/${album._id}`)
          .end((err, res) => {
            expect(err).to.equal(null);
            expect(res.status).to.equal(204);
            Album.findById(album._id, (error, updatedAlbum) => {
              expect(error).to.equal(null);
              expect(updatedAlbum).to.equal(null);
              done();
            });
          });
      });

      it('returns a 404 if the album does not exist', (done) => {
        chai.request(server)
          .delete('/albums/12345')
          .end((err, res) => {
            expect(err).to.equal(null);
            expect(res.status).to.equal(404);
            expect(res.body.error).to.equal('The album could not be found.');
            done();
          });
      });
    });
  });
});
