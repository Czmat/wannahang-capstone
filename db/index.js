const client = require('./client');
const fs = require('fs');

const { authenticate, compare, findUserFromToken, hash } = require('./auth');

const models = ({
  invites,
  user_events,
  users,
  profiles,
  careers,
  hobbies,
  religions,
  genders,
  employment_status,
  pets,
  political_parties,
  events,
  searches,
  photos,
  photosBkgd,
  favorites,
  deleteUser,
} = require('./models'));

const { changePassword } = require('./userMethods');

const sync = async () => {
  let SQL = `
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  CREATE EXTENSION IF NOT EXISTS citext;
  DROP TABLE IF EXISTS user_search_criteria;
  DROP TABLE IF EXISTS user_events;
  DROP TABLE IF EXISTS user_favorites;
  DROP TABLE IF EXISTS events;
  DROP TABLE IF EXISTS user_photos;
  DROP TABLE IF EXISTS user_photos_bkgd;
  DROP TABLE IF EXISTS user_groups CASCADE;
  DROP TABLE IF EXISTS user_profiles CASCADE;
  DROP TABLE IF EXISTS user_hobbies CASCADE;
  DROP TABLE IF EXISTS meetup_locations CASCADE;
  DROP TABLE IF EXISTS careers CASCADE;
  DROP TABLE IF EXISTS hobbies CASCADE;
  DROP TABLE IF EXISTS genders CASCADE;
  DROP TABLE IF EXISTS religions CASCADE;
  DROP TABLE IF EXISTS employment_status CASCADE;
  DROP TABLE IF EXISTS political_parties CASCADE;
  DROP TABLE IF EXISTS pets CASCADE;
  DROP TABLE IF EXISTS user_ratings CASCADE;
  DROP TABLE IF EXISTS users CASCADE;
  DROP TABLE IF EXISTS education CASCADE;



  CREATE TABLE users(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    username VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL,
    email citext UNIQUE,
    password VARCHAR(100),
    userRating INT DEFAULT 0,
    role VARCHAR(20) DEFAULT 'USER',
    CHECK (char_length(username) > 0)
  );
  CREATE TABLE events(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL,
    date TIMESTAMP NOT NULL,
    location VARCHAR(100) NOT NULL,
    description VARCHAR(100) NOT NULL,
    "isPublic" BOOLEAN default false,
    "isAccepted" BOOLEAN default false,
    "userId" UUID REFERENCES users(id) NOT NULL
  );
  CREATE TABLE user_events(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "joinedUserId" UUID REFERENCES users(id),
    "eventId" UUID REFERENCES events(id) NOT NULL,
    "isFavorite" BOOLEAN default false,
    status VARCHAR(10) DEFAULT 'open'
  );

  CREATE TABLE careers(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    career_name VARCHAR(100) NOT NULL
  );
  CREATE TABLE religions(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    religion_name VARCHAR(100) NOT NULL
  );
  CREATE TABLE education(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    education_name VARCHAR(100) NOT NULL
  );
  CREATE TABLE genders(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    gender_name VARCHAR(100) NOT NULL
  );
  CREATE TABLE employment_status(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    status_name VARCHAR(100) NOT NULL
  );
  CREATE TABLE political_parties(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    party_name VARCHAR(100) NOT NULL
  );
  CREATE TABLE pets(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pet_name VARCHAR(100) NOT NULL
  );

  CREATE TABLE hobbies(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    hobby_name VARCHAR(20) NOT NULL,
    hobby_image VARCHAR
  );
  CREATE TABLE user_hobbies(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    hobby_id UUID REFERENCES hobbies(id),
    user_id UUID REFERENCES users(id)
  );

  CREATE TABLE user_photos(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    fileName VARCHAR(100),
    filePath VARCHAR(100),
    "userId" UUID REFERENCES users(id)
  );
  CREATE TABLE user_photos_bkgd(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    fileName VARCHAR(100),
    filePath VARCHAR(100),
    "userId" UUID REFERENCES users(id)
  );
  CREATE TABLE meetup_locations(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    address VARCHAR(100),
    city VARCHAR(50),
    state VARCHAR(20),
    zip_code INT
  );


  CREATE TABLE user_ratings(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    rating INT
  );
  CREATE TABLE user_groups(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    name VARCHAR(100)
  );
  CREATE TABLE user_profiles(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "userId" UUID REFERENCES users(id),
    gender VARCHAR(100),
    politicalAffiliation VARCHAR(100),
    religiousAffiliation VARCHAR(100),
    careerId UUID REFERENCES careers(id),
    education VARCHAR(100),
    pets VARCHAR(100),
    birthdate DATE,
    zipCode VARCHAR(10),
    employmentStatus VARCHAR(100),
    about VARCHAR(250),
    communicationPreference VARCHAR(5)
  );

  CREATE TABLE user_search_criteria(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "userId" UUID REFERENCES users(id),
    gender VARCHAR(100),
    politicalAffiliation VARCHAR(100),
    religiousAffiliation VARCHAR(100),
    careerId UUID REFERENCES careers(id),
    education VARCHAR(100),
    pets VARCHAR(100),
    zipCode VARCHAR(10),
    employmentStatus VARCHAR(100)
  );

  CREATE TABLE user_favorites(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "userId" UUID REFERENCES users(id),
    "favoriteId" UUID REFERENCES users(id)
  );

  INSERT INTO hobbies (hobby_name, hobby_image) VALUES ('Arts & Crafts', 'art.png');
  INSERT INTO hobbies (hobby_name, hobby_image) VALUES ('Books', 'books.png');
  INSERT INTO hobbies (hobby_name, hobby_image) VALUES ('Camping', 'camping.png');
  INSERT INTO hobbies (hobby_name, hobby_image) VALUES ('Collecting', 'collecting.png');
  INSERT INTO hobbies (hobby_name, hobby_image) VALUES ('Computers & Gaming', 'computers.png');
  INSERT INTO hobbies (hobby_name, hobby_image) VALUES ('DIY', 'DIY.png');
  INSERT INTO hobbies (hobby_name, hobby_image) VALUES ('Food & Drinks', 'food.png');
  INSERT INTO hobbies (hobby_name, hobby_image) VALUES ('Games', 'games.png');
  INSERT INTO hobbies (hobby_name, hobby_image) VALUES ('Gardening', 'gardening.png');
  INSERT INTO hobbies (hobby_name, hobby_image) VALUES ('Movies', 'movies.png');
  INSERT INTO hobbies (hobby_name, hobby_image) VALUES ('Music', 'music.png');
  INSERT INTO hobbies (hobby_name, hobby_image) VALUES ('Performing Arts', 'performing.png');
  INSERT INTO hobbies (hobby_name, hobby_image) VALUES ('Pets', 'pet.png');
  INSERT INTO hobbies (hobby_name, hobby_image) VALUES ('Photography', 'photography.png');
  INSERT INTO hobbies (hobby_name, hobby_image) VALUES ('Sewing', 'sewing.png');
  INSERT INTO hobbies (hobby_name, hobby_image) VALUES ('Shopping', 'shopping.png');
  INSERT INTO hobbies (hobby_name, hobby_image) VALUES ('Sports & Outdoors', 'sports.png');
  INSERT INTO hobbies (hobby_name, hobby_image) VALUES ('Travel', 'travel.png');

  INSERT INTO religions (religion_name) VALUES ('Christianity');
  INSERT INTO religions (religion_name) VALUES ('Islam');
  INSERT INTO religions (religion_name) VALUES ('Nonreligious');
  INSERT INTO religions (religion_name) VALUES ('Hinduism');
  INSERT INTO religions (religion_name) VALUES ('Chinese traditional');
  INSERT INTO religions (religion_name) VALUES ('Buddhism');
  INSERT INTO religions (religion_name) VALUES ('Primal-indigenous');
  INSERT INTO religions (religion_name) VALUES ('African traditional');
  INSERT INTO religions (religion_name) VALUES ('Sikhism');
  INSERT INTO religions (religion_name) VALUES ('Juche');
  INSERT INTO religions (religion_name) VALUES ('Spiritism');
  INSERT INTO religions (religion_name) VALUES ('Judaism');
  INSERT INTO religions (religion_name) VALUES ('Bahai');
  INSERT INTO religions (religion_name) VALUES ('Jainism');
  INSERT INTO religions (religion_name) VALUES ('Shinto');
  INSERT INTO religions (religion_name) VALUES ('Cao Dai');
  INSERT INTO religions (religion_name) VALUES ('Zoroastrianism');
  INSERT INTO religions (religion_name) VALUES ('Tenrikyo');
  INSERT INTO religions (religion_name) VALUES ('Neo-Paganism');
  INSERT INTO religions (religion_name) VALUES ('Unitarian-Universalism');
  INSERT INTO religions (religion_name) VALUES ('Athiest');
  INSERT INTO religions (religion_name) VALUES ('Agnostic');
  INSERT INTO religions (religion_name) VALUES ('Other');

  INSERT INTO genders (gender_name) VALUES ('Female');
  INSERT INTO genders (gender_name) VALUES ('Male');
  INSERT INTO genders (gender_name) VALUES ('Agender');
  INSERT INTO genders (gender_name) VALUES ('Androgyne');
  INSERT INTO genders (gender_name) VALUES ('Androgynous');
  INSERT INTO genders (gender_name) VALUES ('Bigender');
  INSERT INTO genders (gender_name) VALUES ('Cis');
  INSERT INTO genders (gender_name) VALUES ('Cis Female');
  INSERT INTO genders (gender_name) VALUES ('Cis Male');
  INSERT INTO genders (gender_name) VALUES ('Cis Man');
  INSERT INTO genders (gender_name) VALUES ('Cis Woman');
  INSERT INTO genders (gender_name) VALUES ('Cisgender');
  INSERT INTO genders (gender_name) VALUES ('Cisgender Female');
  INSERT INTO genders (gender_name) VALUES ('Cisgender Male');
  INSERT INTO genders (gender_name) VALUES ('Cisgender Man');
  INSERT INTO genders (gender_name) VALUES ('Cisgender Woman');
  INSERT INTO genders (gender_name) VALUES ('Female to Male');
  INSERT INTO genders (gender_name) VALUES ('FTM');
  INSERT INTO genders (gender_name) VALUES ('Gender Fluid');
  INSERT INTO genders (gender_name) VALUES ('Gender Nonconforming');
  INSERT INTO genders (gender_name) VALUES ('Gender Questioning');
  INSERT INTO genders (gender_name) VALUES ('Gender Variant');
  INSERT INTO genders (gender_name) VALUES ('Genderqueer');
  INSERT INTO genders (gender_name) VALUES ('Intersex');
  INSERT INTO genders (gender_name) VALUES ('Male to Female');
  INSERT INTO genders (gender_name) VALUES ('MTF');
  INSERT INTO genders (gender_name) VALUES ('Neither');
  INSERT INTO genders (gender_name) VALUES ('Neutrois');
  INSERT INTO genders (gender_name) VALUES ('Non-binary');
  INSERT INTO genders (gender_name) VALUES ('Other');
  INSERT INTO genders (gender_name) VALUES ('Pangender');
  INSERT INTO genders (gender_name) VALUES ('Trans');
  INSERT INTO genders (gender_name) VALUES ('Trans Female');
  INSERT INTO genders (gender_name) VALUES ('Trans Male');
  INSERT INTO genders (gender_name) VALUES ('Trans Man');
  INSERT INTO genders (gender_name) VALUES ('Trans Person');
  INSERT INTO genders (gender_name) VALUES ('Trans Woman');
  INSERT INTO genders (gender_name) VALUES ('Trans');
  INSERT INTO genders (gender_name) VALUES ('Trans Female');
  INSERT INTO genders (gender_name) VALUES ('Trans Male');
  INSERT INTO genders (gender_name) VALUES ('Trans Man');
  INSERT INTO genders (gender_name) VALUES ('Trans Person');
  INSERT INTO genders (gender_name) VALUES ('Trans Woman');
  INSERT INTO genders (gender_name) VALUES ('Transfeminine');
  INSERT INTO genders (gender_name) VALUES ('Transgender');
  INSERT INTO genders (gender_name) VALUES ('Transgender Female');
  INSERT INTO genders (gender_name) VALUES ('Transgender Male');
  INSERT INTO genders (gender_name) VALUES ('Transgender Man');
  INSERT INTO genders (gender_name) VALUES ('Transgender Person');
  INSERT INTO genders (gender_name) VALUES ('Transgender Woman');
  INSERT INTO genders (gender_name) VALUES ('Transmasculine');
  INSERT INTO genders (gender_name) VALUES ('Transsexual');
  INSERT INTO genders (gender_name) VALUES ('Transsexual Female');
  INSERT INTO genders (gender_name) VALUES ('Transsexual Male');
  INSERT INTO genders (gender_name) VALUES ('Transsexual Man');
  INSERT INTO genders (gender_name) VALUES ('Transsexual Person');
  INSERT INTO genders (gender_name) VALUES ('Transsexual Woman');
  INSERT INTO genders (gender_name) VALUES ('Two-spirit');

  INSERT INTO employment_status (status_name) VALUES ('Full-Time');
  INSERT INTO employment_status (status_name) VALUES ('Part-Time');
  INSERT INTO employment_status (status_name) VALUES ('Unemployed');
  INSERT INTO employment_status (status_name) VALUES ('In Schoool');
  INSERT INTO employment_status (status_name) VALUES ('Freelance');
  INSERT INTO employment_status (status_name) VALUES ('Looking...');
  INSERT INTO employment_status (status_name) VALUES ('Retired');
  INSERT INTO employment_status (status_name) VALUES ('Does Not Matter');

  INSERT INTO political_parties (party_name) VALUES ('Democrat');
  INSERT INTO political_parties (party_name) VALUES ('Independent');
  INSERT INTO political_parties (party_name) VALUES ('Republican');
  INSERT INTO political_parties (party_name) VALUES ('Conservative');
  INSERT INTO political_parties (party_name) VALUES ('Liberal');
  INSERT INTO political_parties (party_name) VALUES ('Green');
  INSERT INTO political_parties (party_name) VALUES ('Tea');
  INSERT INTO political_parties (party_name) VALUES ('Libertarian');
  INSERT INTO political_parties (party_name) VALUES ('Other');
  INSERT INTO political_parties (party_name) VALUES ('Does Not Matter');

  INSERT INTO pets (pet_name) VALUES ('Birds');
  INSERT INTO pets (pet_name) VALUES ('Cats');
  INSERT INTO pets (pet_name) VALUES ('Dogs');
  INSERT INTO pets (pet_name) VALUES ('Rodents');
  INSERT INTO pets (pet_name) VALUES ('Horses');
  INSERT INTO pets (pet_name) VALUES ('Reptiles');
  INSERT INTO pets (pet_name) VALUES ('Other');
  INSERT INTO pets (pet_name) VALUES ('Multiple Types of Animals');
  INSERT INTO pets (pet_name) VALUES ('No Pets');
  INSERT INTO pets (pet_name) VALUES ('Does Not Matter');

  INSERT INTO education (education_name) VALUES ('High School');
  INSERT INTO education (education_name) VALUES ('Certificate');
  INSERT INTO education (education_name) VALUES ('Trade School');
  INSERT INTO education (education_name) VALUES ('Some College');
  INSERT INTO education (education_name) VALUES ('Bachelors Degree');
  INSERT INTO education (education_name) VALUES ('Graduate Degree');
  INSERT INTO education (education_name) VALUES ('PhD');
`;

  await client.query(SQL);

  const _users = {
    lucy: {
      firstname: 'Lucy',
      lastname: 'Anabell',
      username: 'lucy',
      phone: '904-321-4567',
      email: 'lucy@gmail.com',
      password: 'LUCY',
      role: 'ADMIN',
    },
    moe: {
      firstname: 'Moe',
      lastname: 'Anabell',
      username: 'moe',
      phone: '904-321-4567',
      email: 'moe@gmail.com',
      password: 'MOE',
      role: 'USER',
    },
    curly: {
      firstname: 'Curly',
      lastname: 'Smith',
      username: 'curly',
      phone: '904-321-4567',
      email: 'curly@gmail.com',
      password: 'CURLY',
    },
    larry: {
      firstname: 'Larry',
      lastname: 'Anabell',
      username: 'larry',
      phone: '904-320-4567',
      email: 'larry@gmail.com',
      password: 'LARRY',
      role: 'USER',
    },
    joe: {
      firstname: 'Joe',
      lastname: 'Anabell',
      username: 'joe',
      phone: '904-322-4567',
      email: 'joe@gmail.com',
      password: 'JOE',
      role: 'USER',
    },
    shemp: {
      firstname: 'Shemp',
      lastname: 'Smith',
      username: 'shemp',
      phone: '904-323-4567',
      email: 'shemp@gmail.com',
      password: 'SHEMP',
      role: 'USER',
    },
    patti: {
      firstname: 'Patti',
      lastname: 'Anabell',
      username: 'patti',
      phone: '904-324-4567',
      email: 'patti@gmail.com',
      password: 'PATTI',
      role: 'USER',
    },
    sally: {
      firstname: 'Sally',
      lastname: 'Anabell',
      username: 'sally',
      phone: '904-325-4567',
      email: 'sally@gmail.com',
      password: 'SALLY',
      role: 'USER',
    },
    marcie: {
      firstname: 'Marcie',
      lastname: 'Smith',
      username: 'marcie',
      phone: '904-326-4567',
      email: 'marcie@gmail.com',
      password: 'MARCIE',
      role: 'USER',
    },
    will: {
      firstname: 'Will',
      lastname: 'Smith',
      username: 'will',
      phone: '904-326-4200',
      email: 'will@gmail.com',
      password: 'WILL',
      role: 'USER',
    },
    daniel: {
      firstname: 'Daniel',
      lastname: 'Lucas',
      username: 'daniel',
      phone: '904-444-5210',
      email: 'daniel@gmail.com',
      password: 'DANIEL',
      role: 'USER',
    },
    georgia: {
      firstname: 'Georgia',
      lastname: 'Williams',
      username: 'georgia',
      phone: '904-555-8820',
      email: 'georgia@gmail.com',
      password: 'GEORGIA',
      role: 'USER',
    },
  };

  const [
    lucy,
    moe,
    curly,
    larry,
    joe,
    shemp,
    patti,
    sally,
    marcie,
    will,
  ] = await Promise.all(
    Object.values(_users).map((user) => users.create(user))
  );

  const userMap = (await users.read()).reduce((acc, user) => {
    acc[user.username] = user;
    return acc;
  }, {});
  //console.log(lucy, moe, curly);
  //seed events
  const _events = {
    park: {
      name: 'park',
      date: '2/2/1996',
      location: 'park',
      description: 'some activity',
      isPublic: true,
      userId: lucy.id,
    },
    beach: {
      name: 'beach',
      date: '2/2/1996',
      location: 'beach',
      description: 'some activity',
      isPublic: false,
      userId: lucy.id,
    },
    dog: {
      name: 'dog',
      date: '2/2/1996 3:00 PM',
      location: 'dog',
      description: 'some activity',
      isPublic: true,
      isAccepted: true,
      userId: curly.id,
    },
    soccer: {
      name: 'soccer',
      date: '2/2/1996 3:00 PM',
      location: 'jax beach',
      description: 'play soccer on the beach',
      isPublic: true,
      userId: moe.id,
    },
    joke: {
      name: 'joke',
      date: '2/2/1996 3:00 PM',
      location: 'zoom',
      description: 'just want to tell you jokes',
      isPublic: true,
      isAccepted: true,
      userId: moe.id,
    },
    nap: {
      name: 'nap',
      date: '2/2/1996 3:00 PM',
      location: 'my house',
      description: 'take a nap together',
      isPublic: true,
      userId: curly.id,
    },
  };

  const [park, beach, dog, soccer, joke, nap] = await Promise.all(
    Object.values(_events).map((event) => events.create(event))
  );

  const eventMap = (await events.read()).reduce((acc, event) => {
    acc[event.name] = event;
    return acc;
  }, {});

  //seeding user_events
  const _user_events = {
    nap: {
      joinedUserId: moe.id,
      eventId: nap.id,
      isFavorite: true,
    },
    soccer: {
      joinedUserId: lucy.id,
      eventId: soccer.id,
      isFavorite: true,
      status: 'invited',
    },
    joke: {
      joinedUserId: lucy.id,
      eventId: joke.id,
      isFavorite: true,
      status: 'accepted',
    },
    dog: {
      joinedUserId: moe.id,
      eventId: dog.id,
      isFavorite: true,
      status: 'accepted',
    },
    beach: {
      joinedUserId: moe.id,
      eventId: beach.id,
      isFavorite: false,
      status: 'invited',
    },
    park: {
      joinedUserId: curly.id,
      eventId: park.id,
      isFavorite: false,
      status: 'invited',
    },
  };
  const [unap, usoccer, usoccercurly, ujoke, udog] = await Promise.all(
    Object.values(_user_events).map((user_event) =>
      user_events.create(user_event)
    )
  );

  const userEventMap = (await user_events.read()).reduce((acc, user_event) => {
    acc[user_event.status] = user_event;
    return acc;
  }, {});

  //seeding favorite
  const _favorites = {
    mlucy: {
      userId: lucy.id,
      favoriteId: larry.id,
    },
    lwill: {
      userId: lucy.id,
      favoriteId: will.id,
    },
    lpatti: {
      userId: lucy.id,
      favoriteId: patti.id,
    },
    mwill: {
      userId: moe.id,
      favoriteId: will.id,
    },
    mmarcie: {
      userId: lucy.id,
      favoriteId: marcie.id,
    },
  };
  const [flucy, fwill, fcurly, fjoke, fdog] = await Promise.all(
    Object.values(_favorites).map((favorite) => favorites.create(favorite))
  );

  const favoritesMap = (await favorites.show(lucy.id)).reduce(
    (acc, favorite) => {
      acc[favorite.userId] = favorite;
      return acc;
    },
    {}
  );
  //console.log(favoritesMap, 'fav map');

  Promise.all([
    careers.createCareer('Computers and Technology'),
    careers.createCareer('Health Care and Allied Health'),
    careers.createCareer('Education and Social Services'),
    careers.createCareer('Arts and Communications'),
    careers.createCareer('Trades and Transportation'),
    careers.createCareer('Management, Business, and Finance'),
    careers.createCareer('Architecture and Civil Engineering'),
    careers.createCareer('Science'),
    careers.createCareer('Hospitality, Tourism, and the Service Industry'),
    careers.createCareer('Law and Law Enforcement'),
    careers.createCareer('Other'),
    careers.createCareer('Does not matter'),
  ]);

  const compid = await careers
    .findCareerId('Computers and Technology')
    .then((response) => response.id);
  const eduid = await careers
    .findCareerId('Education and Social Services')
    .then((response) => response.id);
  const othid = await careers
    .findCareerId('Other')
    .then((response) => response.id);

  const booksHobby = await hobbies
    .findHobbyId('Books')
    .then((response) => response.id);
  const gamesHobby = await hobbies
    .findHobbyId('Games')
    .then((response) => response.id);
  const moviesHobby = await hobbies
    .findHobbyId('Movies')
    .then((response) => response.id);

  const lucyid = await users.findUserId('lucy').then((response) => response.id);
  const moeid = await users.findUserId('moe').then((response) => response.id);
  const curlyid = await users
    .findUserId('curly')
    .then((response) => response.id);
  const larryid = await users
    .findUserId('larry')
    .then((response) => response.id);
  const shempid = await users
    .findUserId('shemp')
    .then((response) => response.id);
  const joeid = await users.findUserId('joe').then((response) => response.id);
  const pattiid = await users
    .findUserId('patti')
    .then((response) => response.id);
  const sallyid = await users
    .findUserId('sally')
    .then((response) => response.id);
  const marcieid = await users
    .findUserId('marcie')
    .then((response) => response.id);
  const willid = await users.findUserId('will').then((response) => response.id);
  const danielid = await users
    .findUserId('daniel')
    .then((response) => response.id);
  const georgiaid = await users
    .findUserId('georgia')
    .then((response) => response.id);

  Promise.all([
    hobbies.createUserHobbies({
      user_id: pattiid,
      hobby_id: booksHobby,
    }),
    hobbies.createUserHobbies({
      user_id: marcieid,
      hobby_id: moviesHobby,
    }),
    hobbies.createUserHobbies({
      user_id: pattiid,
      hobby_id: gamesHobby,
    }),
    hobbies.createUserHobbies({
      user_id: willid,
      hobby_id: booksHobby,
    }),
    hobbies.createUserHobbies({
      user_id: willid,
      hobby_id: moviesHobby,
    }),
  ]);

  Promise.all([
    photos.createPhoto({
      filePath: '/uploads/lucy.jpg',
      fileName: 'lucy.jpg',
      userId: lucyid,
    }),
    photos.createPhoto({
      filePath: '/uploads/moe.jpg',
      fileName: 'moe.jpg',
      userId: moeid,
    }),
    photos.createPhoto({
      filePath: '/uploads/curly.jpg',
      fileName: 'curly.jpg',
      userId: curlyid,
    }),
    photos.createPhoto({
      filePath: '/uploads/larry.jpg',
      fileName: 'larry.jpg',
      userId: larryid,
    }),
    photos.createPhoto({
      filePath: '/uploads/shemp.jpg',
      fileName: 'shemp.jpg',
      userId: shempid,
    }),
    photos.createPhoto({
      filePath: '/uploads/',
      fileName: '',
      userId: joeid,
    }),
    photos.createPhoto({
      filePath: '/uploads/patty.jpg',
      fileName: 'patty.jpg',
      userId: pattiid,
    }),
    photos.createPhoto({
      filePath: '/uploads/Sally.jpg',
      fileName: 'Sally.jpg',
      userId: sallyid,
    }),
    photos.createPhoto({
      filePath: '/uploads/Marcie.jpg',
      fileName: 'Marcie.jpg',
      userId: marcieid,
    }),
    photos.createPhoto({
      filePath: '/uploads/Will.jpg',
      fileName: 'Will.jpg',
      userId: willid,
    }),
    photos.createPhoto({
      filePath: '/uploads/Daniel.jpg',
      fileName: 'Daniel.jpg',
      userId: danielid,
    }),
    photos.createPhoto({
      filePath: '/uploads/Georgia.jpg',
      fileName: 'Georgia.jpg',
      userId: georgiaid,
    }),
  ]);
  Promise.all([
    photosBkgd.createPhotoBkgd({
      filePath: '/uploads/',
      fileName: '',
      userId: lucyid,
    }),
    photosBkgd.createPhotoBkgd({
      filePath: '/uploads/',
      fileName: 'three-stooges.jpg',
      userId: moeid,
    }),
    photosBkgd.createPhotoBkgd({
      filePath: '/uploads/',
      fileName: 'three-stooges.jpg',
      userId: curlyid,
    }),
    photosBkgd.createPhotoBkgd({
      filePath: '/uploads/three-stooges.jpg',
      fileName: 'three-stooges.jpg',
      userId: larryid,
    }),
    photosBkgd.createPhotoBkgd({
      filePath: '/uploads/',
      fileName: '',
      userId: shempid,
    }),
    photosBkgd.createPhotoBkgd({
      filePath: '/uploads/dock.jpg',
      fileName: 'dock.jpg',
      userId: joeid,
    }),
    photosBkgd.createPhotoBkgd({
      filePath: '/uploads/bike.jpg',
      fileName: 'bike.jpg',
      userId: pattiid,
    }),
    photosBkgd.createPhotoBkgd({
      filePath: '/uploads/red-jeep.jpg',
      fileName: 'red-jeep.jpg',
      userId: sallyid,
    }),
    photosBkgd.createPhotoBkgd({
      filePath: '/uploads/girls-party.jpg',
      fileName: 'girls-party.jpg',
      userId: marcieid,
    }),
    photosBkgd.createPhotoBkgd({
      filePath: '/uploads/will-scene.jpg',
      fileName: 'will-scene.jpg',
      userId: willid,
    }),
    photosBkgd.createPhotoBkgd({
      filePath: '/uploads/basketball.jpg',
      fileName: 'basketball.jpg',
      userId: danielid,
    }),
    photosBkgd.createPhotoBkgd({
      filePath: '/uploads/highway.jpg',
      fileName: 'highway.jpg',
      userId: georgiaid,
    }),
  ]);

  Promise.all([
    profiles.createProfile({
      userId: willid,
      gender: 'Male',
      politicalAffiliation: 'Independant',
      religiousAffiliation: 'Christianity',
      careerId: eduid,
      education: 'College educated',
      pets: 'Dogs',
      birthdate: '2/2/1996',
      zipCode: '32207',
      employmentStatus: 'Full time',
      about:
        'I am an extrovert. I totally love to travel. My travel-buddy got married and now I need a new person who wants to see the world.',
      communicationPreference: 'Email',
    }),
    profiles.createProfile({
      userId: lucyid,
      gender: 'Female',
      politicalAffiliation: 'Democrat',
      religiousAffiliation: 'Christianity',
      careerId: eduid,
      education: 'College educated',
      pets: 'Dogs',
      birthdate: '2/2/1996',
      zipCode: '32207',
      employmentStatus: 'Full time',
      about: 'Extrovert',
      communicationPreference: 'Email',
    }),
    profiles.createProfile({
      userId: moeid,
      gender: 'Male',
      politicalAffiliation: 'Independent',
      religiousAffiliation: 'Athiest',
      careerId: othid,
      education: 'Trade school',
      pets: 'Reptiles',
      birthdate: '5/5/1960',
      zipCode: '32073',
      employmentStatus: 'Retired',
      about: 'Introvert',
      communicationPreference: 'Text',
    }),
    profiles.createProfile({
      userId: curlyid,
      gender: 'Male',
      politicalAffiliation: 'Green Party',
      religiousAffiliation: 'Protestant',
      careerId: compid,
      education: 'High school',
      pets: 'Cats',
      birthdate: '10/10/1980',
      zipCode: '32210',
      employmentStatus: 'Part time',
      about: 'Life of the party!',
      communicationPreference: 'Email',
    }),
    profiles.createProfile({
      userId: larryid,
      gender: 'Female',
      politicalAffiliation: 'Democrat',
      religiousAffiliation: 'Christianity',
      careerId: eduid,
      education: 'College educated',
      pets: 'Dogs',
      birthdate: '2/2/1986',
      zipCode: '32207',
      employmentStatus: 'Full time',
      about: 'Shy',
      communicationPreference: 'Email',
    }),
    profiles.createProfile({
      userId: joeid,
      gender: 'Male',
      politicalAffiliation: 'Independent',
      religiousAffiliation: 'Athiest',
      careerId: othid,
      education: 'Trade school',
      pets: 'Reptiles',
      birthdate: '5/5/1970',
      zipCode: '32073',
      employmentStatus: 'Retired',
      about: 'IDK',
      communicationPreference: 'Text',
    }),
    profiles.createProfile({
      userId: shempid,
      gender: 'Male',
      politicalAffiliation: 'Green Party',
      religiousAffiliation: 'Protestant',
      careerId: compid,
      education: 'High school',
      pets: 'Cats',
      birthdate: '10/10/1990',
      zipCode: '32210',
      employmentStatus: 'Part time',
      about: 'Substitute',
      communicationPreference: 'Email',
    }),
    profiles.createProfile({
      userId: pattiid,
      gender: 'Female',
      politicalAffiliation: 'Democrat',
      religiousAffiliation: 'Christianity',
      careerId: eduid,
      education: 'College educated',
      pets: 'Dogs',
      birthdate: '2/2/1997',
      zipCode: '32207',
      employmentStatus: 'Full time',
      about:
        'Hey! I an new to the area. Just looking for a friend to hang out with. Maybe go to the movies or who wants to go to the dog park with me.',
      communicationPreference: 'Email',
    }),
    profiles.createProfile({
      userId: sallyid,
      gender: 'Female',
      politicalAffiliation: 'Independent',
      religiousAffiliation: 'Athiest',
      careerId: othid,
      education: 'Trade school',
      pets: 'Reptiles',
      birthdate: '5/5/1979',
      zipCode: '32073',
      employmentStatus: 'Retired',
      about: 'Football',
      communicationPreference: 'Text',
    }),
    profiles.createProfile({
      userId: marcieid,
      gender: 'Female',
      politicalAffiliation: 'Green Party',
      religiousAffiliation: 'Protestant',
      careerId: compid,
      education: 'High school',
      pets: 'Cats',
      birthdate: '10/10/1983',
      zipCode: '32207',
      employmentStatus: 'Part time',
      about: 'Glasses',
      communicationPreference: 'Email',
    }),
    profiles.createProfile({
      userId: danielid,
      gender: 'Male',
      politicalAffiliation: 'Democrat',
      religiousAffiliation: 'Christian',
      careerId: compid,
      education: 'High school',
      pets: 'Dogs',
      birthdate: '12/01/1984',
      zipCode: '32207',
      employmentStatus: 'Part time',
      about:
        "I am kind of science nerd. I like sci-fi movies, I read sci-fi books and I go to WorldCon every year. Star Wars is my favorite movie and Ender's Game is my favorite book. Anybody want to go to sci-fi stuff with me?",
      communicationPreference: 'Email',
    }),
    profiles.createProfile({
      userId: georgiaid,
      gender: 'Female',
      politicalAffiliation: 'Republican',
      religiousAffiliation: 'Christian',
      careerId: compid,
      education: 'High school',
      pets: 'Birds',
      birthdate: '12/01/1960',
      zipCode: '32207',
      employmentStatus: 'Part time',
      about:
        "I have just recently been widowed and want to get back out there - I just don't know how. I'd like to find some girl friends to have dinner with, visit a few vineyards, maybe go shopping with...",
      communicationPreference: 'Email',
    }),
  ]);

  return {
    users: userMap,
  };
};

const readCareers = async () => {
  return (await client.query('SELECT * from careers')).rows;
};
const readZipCodes = async () => {
  return (await client.query('SELECT zipCode from user_profiles')).rows;
};
const readReligions = async () => {
  return (await client.query('SELECT * from religions')).rows;
};
const readGenders = async () => {
  return (await client.query('SELECT * from genders')).rows;
};
const readHobbies = async () => {
  return (await client.query('SELECT * from hobbies')).rows;
};
const readEmploymentStatus = async () => {
  return (await client.query('SELECT * from employment_status')).rows;
};
const readPoliticalParties = async () => {
  return (await client.query('SELECT * from political_parties')).rows;
};
const readPets = async () => {
  return (await client.query('SELECT * from pets')).rows;
};
const readEducation = async () => {
  return (await client.query('SELECT * from education')).rows;
};
const readProfiles = async () => {
  return (await client.query('SELECT * from user_profiles')).rows;
};
const findUsersWithZipCode = async (userid) => {
  const SQL = `SELECT users.username FROM user_profiles
  JOIN users ON user_profiles."userId" = users.id
  WHERE "userId" = ($1)`;
  const response = await client.query(SQL, [userid]);
  return response.rows;
};
const readUsernameProfiles = async () => {
  return (
    await client.query(`SELECT
  user_profiles."userId", user_profiles.gender, user_profiles.politicalaffiliation, user_profiles.religiousaffiliation, user_profiles.careerid, user_profiles.education, user_profiles.pets, user_profiles.birthdate, user_profiles.zipcode, user_profiles.employmentstatus, user_profiles.about, user_profiles.communicationpreference
  FROM user_profiles JOIN users ON user_profiles."userId" = users.id`)
  ).rows;
};
const readPhotos = async () => {
  return (await client.query('SELECT * from user_photos')).rows;
};
const readPhotosBkgd = async () => {
  return (await client.query('SELECT * from user_photos_bkgd')).rows;
};

// const createUserInfo = async ([
//   user,
//   userGender,
//   userPoliticalAffiliation,
//   userReligiousAffiliation,
//   userPets,
//   userBirthdate,
//   userEmploymentStatus,
//   userAbout,
//   userZipcode,
//   userCommunicationPreference,
// ]) => {
//   const SQL = `INSERT INTO user_profiles (user, gender, politicalAffiliation, religiousAffiliation, pets, birthdate, employmentStatus, userAbout, zipcode, communicationPreference) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10 ) returning *`;
//   return (
//     await client.query(SQL, [
//       user,
//       gender,
//       politicalAffiliation,
//       religiousAffiliation,
//       pets,
//       birthdate,
//       employmentStatus,
//       userAbout,
//       zipcode,
//       communicationPreference,
//     ])
//   ).rows[0];
// };
module.exports = {
  sync,
  models,
  authenticate,
  findUserFromToken,
  readCareers,
  readHobbies,
  readReligions,
  readGenders,
  readEmploymentStatus,
  readPoliticalParties,
  readPets,
  findUsersWithZipCode,
  readZipCodes,
  readEducation,
  readProfiles,
  readUsernameProfiles,
  readPhotos,
  readPhotosBkgd,
  // createUserInfo,
};
