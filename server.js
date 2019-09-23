var express = require("express");
var express_graphql = require("express-graphql");
var { buildSchema } = require("graphql");
// GraphQL schema
var schema = buildSchema(`
    type Query {
        client(id: Int!): Client
        clients: [Client]
        room(id: Int!): Room
        rooms: [Room]
        course(id: Int!): Course
        courses(topic: String): [Course]
    },
    type Mutation {
        updateCourseTopic(id: Int!, topic: String!): Course
        updateRoom(id: Int!, room: RoomInput!): Room
    }
    type Course {
        id: Int
        title: String
        author: String
        description: String
        topic: String
        url: String
    }
    type Client {
        id: Int
        name: String
    }
    input ClientInput {
      name: String
    }
    type Room {
        id: Int
        name: String
        description: String
        capacity: Int
        price: Int
    }
    input RoomInput {
        name: String
        description: String
        capacity: Int
        price: Int
    }
`);

var clientsData = [
  {
    id: 1,
    name: "Luis Arce",
  },
  {
    id: 2,
    name: "Hansel Arce",
  },
];

var roomsData = [
  {
    id: 1,
    name: "Single Room",
    description: "Description of a single room",
    capacity: 1,
    price: 50
  }
];

var coursesData = [
  {
    id: 1,
    title: "The Complete Node.js Developer Course",
    author: "Andrew Mead, Rob Percival",
    description:
      "Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!",
    topic: "Node.js",
    url: "https://codingthesmartway.com/courses/nodejs/"
  },
  {
    id: 2,
    title: "Node.js, Express & MongoDB Dev to Deployment",
    author: "Brad Traversy",
    description:
      "Learn by example building & deploying real-world Node.js applications from absolute scratch",
    topic: "Node.js",
    url: "https://codingthesmartway.com/courses/nodejs-express-mongodb/"
  },
  {
    id: 3,
    title: "JavaScript: Understanding The Weird Parts",
    author: "Anthony Alicea",
    description:
      "An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.",
    topic: "JavaScript",
    url: "https://codingthesmartway.com/courses/understand-javascript/"
  }
];

var updateCourseTopic = function({ id, topic }) {
  coursesData.map(course => {
    if (course.id === id) {
      course.topic = topic;
      return course;
    }
  });
  return coursesData.filter(course => course.id === id)[0];
};

var updateClient = function({ id, client }) {
  clientsData = clientsData.map(c => {
    if (c.id === id) {
      c.name = client.name;
      c.description = client.description;
      c.capacity = client.capacity;
      c.price = client.price;
    }
    return c;
  });
  return clientsData.filter(c => c.id === id)[0];
};

var updateRoom = function({ id, room }) {
  roomsData = roomsData.map(r => {
    if (r.id === id) {
      r.name = room.name;
      r.description = room.description;
      r.capacity = room.capacity;
      r.price = room.price;
      return r;
    }
  });
  return roomsData.filter(r => r.id === id)[0];
};

var getClient = function({ id }) {
  return clientsData.filter(d => {
    return d.id == id;
  })[0];
};

var getRoom = function(args) {
  var id = args.id;
  return roomsData.filter(room => {
    return room.id == id;
  })[0];
};

var getCourse = function(args) {
  var id = args.id;
  return coursesData.filter(course => {
    return course.id == id;
  })[0];
};


var getClients = function() {
  return clientsData;
};

var getRooms = function() {
  return roomsData;
};
var getCourses = function(args) {
  if (args.topic) {
    var topic = args.topic;
    return coursesData.filter(course => course.topic === topic);
  } else {
    return coursesData;
  }
};

var root = {
  course: getCourse,
  courses: getCourses,
  client: getClient,
  clients: getClients,
  room: getRoom,
  rooms: getRooms,
  updateCourseTopic: updateCourseTopic,
  updateRoom: updateRoom
};
// Create an express server and a GraphQL endpoint
var app = express();
app.use(
  "/graphql",
  express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);
app.listen(4000, () =>
  console.log("Express GraphQL Server Now Running On localhost:4000/graphql")
);
