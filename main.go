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
	var port string
	if os.Getenv("GO_ENV") == "PRODUCTION" {
		// let heroku set port in production
		port = ":" + os.Getenv("PORT")
	} else {
		port = ":8081"
	}
	err := http.ListenAndServe(port, nil)
	if err != nil {
		fmt.Println("ListenAndServeError:", err)
	}
}
