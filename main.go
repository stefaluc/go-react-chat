package main

import (
	"net/http"
	"fmt"
	"os"
)

func main() {
	fmt.Println("Launching server...")

	// start conn_hub
	hub := newConnHub()
	go hub.run()
	// serve create-react-app-bundle
	fs := http.FileServer(http.Dir("./app/build"))
	http.Handle("/", fs)
	// serve websocket route
	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		wsHandler(hub, w, r)
	})
	// start server
	err := http.ListenAndServe(os.Getenv("PORT"), nil)
	if err != nil {
		fmt.Println("ListenAndServeError:", err)
	}
}
