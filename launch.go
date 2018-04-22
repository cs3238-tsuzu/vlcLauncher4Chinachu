package main

import (
	"errors"
	"os/exec"
	"runtime"
)

func launch(url string) error {
	switch runtime.GOOS {
	case "darwin":
		cmd := exec.Command("open", url, "-a", "VLC")

		if err := cmd.Run(); err != nil {
			return err
		}

	default:
		return errors.New("Not implemented for your platform")
	}

	return nil
}
