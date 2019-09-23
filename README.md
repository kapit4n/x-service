# x-service
graphql, test project.

#Queries
- 1, get room
```
query getSingleRoom {
    room(id: 1) {
        id
    		name
    }
}
```

- 2 , update room
```
mutation uRoom($roomInput: RoomInput!){
  updateRoom(id: 1, room: $roomInput) {
    id
    name
  }
}

{
  "roomInput": {
    "name": "Code", 
    "description": "des", 
    "capacity": 1, 
    "price": 200 
  }
}
```
