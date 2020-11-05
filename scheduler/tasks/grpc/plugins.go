/*
 * Copyright (c) 2018. Abstrium SAS <team (at) pydio.com>
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

// Package grpc provides a gRPC service to effectively run task instances on multiple workers.
package grpc

import (
	"context"

	"github.com/micro/go-micro"
	"github.com/pydio/cells/common/plugins"
	"github.com/pydio/cells/common/proto/jobs"
	"github.com/pydio/cells/x/configx"

	"github.com/pydio/cells/common"
	"github.com/pydio/cells/common/service"
	"github.com/pydio/cells/scheduler/tasks"
)

func init() {
	plugins.Register(func(ctx context.Context) {
		service.NewService(
			service.Name(common.SERVICE_GRPC_NAMESPACE_+common.SERVICE_TASKS),
			service.Context(ctx),
			service.Tag(common.SERVICE_TAG_SCHEDULER),
			service.Description("Tasks are running jobs dispatched on multiple workers"),
			service.Dependency(common.SERVICE_GRPC_NAMESPACE_+common.SERVICE_JOBS, []string{}),
			service.WithMicro(func(m micro.Service) error {
				jobs.RegisterTaskServiceHandler(m.Options().Server, new(Handler))
				multiplexer := tasks.NewSubscriber(m.Options().Context, m.Options().Client, m.Options().Server)
				multiplexer.Init()
				return nil
			}),
			service.WatchPath("services/pydio.web.oauth/connectors", func(s service.Service, c configx.Values) {
				s.Stop()

				s.Start(ctx)
			}),
		)
	})
}
