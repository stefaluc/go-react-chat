package main

import (
	"net/http"
	"fmt"
)

func main() {
	fmt.Println("Launching server...")

	// start conn_hub
	// connHub := newConnHub
	// go connHub.run()

	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		wsHandler(/* hub ,*/ w, r)
	})
	err := http.ListenAndServe(":8081", nil)
	if err != nil {
		fmt.Println("ListenAndServeError:", err)
	}
}
