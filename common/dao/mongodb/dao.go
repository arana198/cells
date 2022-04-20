/*
 * Copyright (c) 2019-2022. Abstrium SAS <team (at) pydio.com>
 * This file is part of Pydio Cells.
 *
 * Pydio Cells is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Pydio Cells is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Pydio Cells.  If not, see <http://www.gnu.org/licenses/>.
 *
 * The latest code can be found at <https://pydio.com>.
 */

package mongodb

import (
	"fmt"
	"net/url"
	"path"

	"go.mongodb.org/mongo-driver/mongo"

	"github.com/pydio/cells/v4/common/dao"
	"github.com/pydio/cells/v4/common/utils/configx"
)

const Driver = "mongodb"

func init() {
	dao.RegisterDAODriver(Driver, NewDAO, func(driver, dsn string) dao.ConnDriver {
		return &mongodb{}
	})
	dao.RegisterIndexerDriver(Driver, NewIndexer)
}

// DAO defines the functions specific to the boltdb dao
type DAO interface {
	dao.DAO
	Collection(name string) *mongo.Collection
	DB() *mongo.Database
}

// Handler for the main functions of the DAO
type Handler struct {
	dao.DAO
	dbName string
}

// NewDAO creates a new handler for the boltdb dao
func NewDAO(driver string, dsn string, prefix string) (dao.DAO, error) {
	conn, err := dao.NewConn(driver, dsn)
	if err != nil {
		return nil, err
	}
	var dbName string
	if u, e := url.Parse(dsn); e == nil {
		dbName = path.Base(u.Path)
	}
	if dbName == "" {
		fmt.Println("Warning, Mongodb DSN must provide a dbName via the path")
	}
	return &Handler{
		DAO:    dao.AbstractDAO(conn, driver, prefix),
		dbName: dbName,
	}, nil
}

// Init initialises the handler
func (h *Handler) Init(cfg configx.Values) error {
	return nil
}

// DB returns the bolt DB object
func (h *Handler) DB() *mongo.Database {
	if h == nil {
		return nil
	}

	if conn := h.GetConn(); conn != nil {
		client := conn.(*mongo.Client)
		return client.Database(h.dbName)
	}
	return nil
}

// Collection returns a usable *mongo.Collection
func (h *Handler) Collection(name string) *mongo.Collection {
	if pref := h.Prefix(); pref != "" {
		name = pref + "_" + name
	}
	return h.DB().Collection(name)
}
