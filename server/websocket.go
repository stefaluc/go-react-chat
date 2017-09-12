package main

import (
	"fmt"
	"net/http"
	"github.com/gorilla/websocket"
)

type JsonData struct {
	Number int
}

var upgrader = websocket.Upgrader{
	ReadBufferSize: 1024,
	WriteBufferSize: 1024,
	// needed to allow connections from any origin for :3000 -> :8081
	CheckOrigin: func(r *http.Request) bool { return true },
}

// handle /ws route, upgrade HTTP request and forward ws conn to worker
func websocketHandler(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		http.Error(w, "Could not open websocket connection", http.StatusBadRequest)
	}

	go handleConnection(conn)
}

func handleConnection(conn *websocket.Conn) {
	fmt.Println("Handling new connection")

	for {
		fmt.Println("Awaiting data from connection...")

		res := JsonData{}

		if err := conn.ReadJSON(&res); err != nil {
			fmt.Println("Error reading JSON", err)
		}

		fmt.Printf("Get response: %#v\n", res)

		if err := conn.WriteJSON(res); err != nil {
			fmt.Println("Error writing JSON", err)
		}
	}
}

func main() {
	fmt.Println("Launching server...")

	http.HandleFunc("/ws", websocketHandler)
	http.ListenAndServe(":8081", nil)
}
