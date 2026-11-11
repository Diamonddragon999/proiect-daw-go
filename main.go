package main

import (
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/glebarez/sqlite"
	"gorm.io/gorm"
)

func main() {
	dir := os.Getenv("DATA_DIR")
	if dir == "" {
		dir = "data"
	}
	os.MkdirAll(dir+"/uploads", 0755)

	db, err := gorm.Open(sqlite.Open(dir+"/fmi.sqlite"), &gorm.Config{})
	if err != nil {
		panic(err)
	}

	r := gin.Default()

	r.GET("/api/health", func(c *gin.Context) {
		var n int
		db.Raw("select 1").Scan(&n)
		c.JSON(http.StatusOK, gin.H{"status": "ok", "db": n == 1})
	})

	r.Static("/uploads", dir+"/uploads")

	r.NoRoute(func(c *gin.Context) {
		if _, err := os.Stat("web/dist/index.html"); err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "not found"})
			return
		}
		f := "web/dist" + c.Request.URL.Path
		if info, err := os.Stat(f); err == nil && !info.IsDir() {
			c.File(f)
			return
		}
		c.File("web/dist/index.html")
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	r.Run(":" + port)
}
