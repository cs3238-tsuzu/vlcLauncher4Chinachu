package main

import (
	"encoding/json"
	"flag"
	"log"
	"net/http"
)

var (
	addr = flag.String("addr", "127.0.0.1:52145", "address for http server")
	help = flag.Bool("help", false, "show this")
)

func main() {
	flag.Parse()

	if *help {
		flag.Usage()

		return
	}

	mux := http.NewServeMux()

	type data struct {
		URL string
	}

	mux.HandleFunc("/launch", func(rw http.ResponseWriter, req *http.Request) {
		switch req.Method {
		case "GET":
			rw.WriteHeader(http.StatusNotImplemented)

			return
		case "OPTIONS":
			return
		case "POST":
			var d data

			if err := json.NewDecoder(req.Body).Decode(&d); err != nil {
				rw.WriteHeader(http.StatusBadRequest)

				return
			}

			if err := launch(d.URL); err != nil {
				log.Println("error:", err)

				rw.WriteHeader(http.StatusInternalServerError)
			}

			log.Println("VLC launched:", d.URL)
		}
	})
	http.ListenAndServe(":52145", mux)
}
