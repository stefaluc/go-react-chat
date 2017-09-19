package main

type ConnHub struct {
	clients map[*Client]string
	broadcast chan []byte
	register chan *Client
	unregister chan *Client
}

// init ConnHub
func newConnHub() *ConnHub {
	return &ConnHub{
		clients: make(map[*Client]string),
		broadcast: make(chan []byte),
		register: make(chan *Client),
		unregister: make(chan *Client),
	}
}

// handles channel actions of a ConnHub
func (hub *ConnHub) run() {
	for {
		select {
		// register client to hub
		case client := <-hub.register:
			hub.clients[client] = client.name
		// unregister client to hub
		case client := <-hub.unregister:
			if _, ok := hub.clients[client]; ok {
				delete(hub.clients, client)
				close(client.send)
			}
		// loop through registered clients and send message to their send channel
		case message := <-hub.broadcast:
			for client := range hub.clients {
				select {
				case client.send <- message:
				// if send buffer is full, assume client is dead or stuck and unregister
				default:
					close(client.send)
					delete(hub.clients, client)
				}
			}
		}
	}
}
