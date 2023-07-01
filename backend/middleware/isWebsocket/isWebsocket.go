package isWebsocket

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/websocket/v2"
)

func isWebSocket(c *fiber.Ctx) error {
	if !websocket.IsWebSocketUpgrade(c) { // Returns true if the client requested upgrade to the WebSocket protocol
		return c.SendStatus(fiber.StatusUpgradeRequired)
	}
	return c.Next()
}

func New() func(c *fiber.Ctx) error {
	return isWebSocket
}
