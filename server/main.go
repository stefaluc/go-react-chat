package main

import (
	"net/http"
	"fmt"
)

func main() {
	fmt.Println("Launching server...")

	// start conn_hub
	hub := newConnHub()
	go hub.run()

	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		wsHandler(hub, w, r)
	})
	err := http.ListenAndServe(":8081", nil)
	if err != nil {
		fmt.Println("ListenAndServeError:", err)
	}
}
