package cache

import (
	"context"
	"encoding/json"
	"time"

	"github.com/allegro/bigcache"
)

type Cache struct {
	l1  *bigcache.BigCache
	ttl time.Duration
}

func New(ttl time.Duration) (*Cache, error) {
	l1, err := bigcache.New(context.Background(), bigcache.Config{
		Shards:             1024,
		LifeWindow:         ttl,
		CleanWindow:        5 * time.Minute,
		MaxEntriesInWindow: 1000 * 10,
		MaxEntrySize:       500,
		Verbose:            false,
		HardMaxCacheSize:   256,
	})
	if err != nil {
		return nil, err
	}
	return &Cache{l1: l1, ttl: ttl}, nil
}

func (c *Cache) Get(key string, dest interface{}) error {
	data, err := c.l1.Get(key)
	if err != nil {
		return err
	}
	return json.Unmarshal(data, dest)
}

func (c *Cache) Set(key string, value interface{}) error {
	data, err := json.Marshal(value)
	if err != nil {
		return err
	}
	return c.l1.Set(key, data)
}

func (c *Cache) Delete(key string) error {
	return c.l1.Delete(key)
}

func (c *Cache) Close() error {
	return c.l1.Close()
}

var appraisalCache *Cache

func InitCache() error {
	var err error
	appraisalCache, err = New(1 * time.Hour)
	return err
}

func GetCache() *Cache {
	return appraisalCache
}
