export declare const auth: import("better-auth").Auth<{
    database: (options: import("better-auth").BetterAuthOptions) => import("better-auth").DBAdapter<import("better-auth").BetterAuthOptions>;
    secret: string;
    baseURL: string;
    trustedOrigins: string[];
    emailAndPassword: {
        enabled: true;
    };
    plugins: [{
        id: "admin";
        version: string;
        init(): {
            options: {
                databaseHooks: {
                    user: {
                        create: {
                            before(user: {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            } & Record<string, unknown>): Promise<{
                                data: {
                                    id: string;
                                    createdAt: Date;
                                    updatedAt: Date;
                                    email: string;
                                    emailVerified: boolean;
                                    name: string;
                                    image?: string | null | undefined;
                                    role: string;
                                };
                            }>;
                        };
                    };
                    session: {
                        create: {
                            before(session: {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            } & Record<string, unknown>, ctx: import("better-auth").GenericEndpointContext | null): Promise<void>;
                        };
                    };
                };
            };
        };
        hooks: {
            after: {
                matcher(context: import("better-auth").HookEndpointContext): boolean;
                handler: import("better-auth").Middleware<import("better-auth").MiddlewareOptions, (inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<import("better-auth/plugins").SessionWithImpersonatedBy[] | undefined>>;
            }[];
        };
        endpoints: {
            setRole: import("better-auth").StrictEndpoint<"/admin/set-role", {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    userId: import("better-auth").ZodCoercedString<unknown>;
                    role: import("better-auth").ZodUnion<readonly [import("better-auth").ZodString, import("better-auth").ZodArray<import("better-auth").ZodString>]>;
                }, import("zod/v4/core").$strip>;
                requireHeaders: true;
                use: import("better-auth").Middleware<import("better-auth").MiddlewareOptions, (inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                    session: {
                        user: import("better-auth/plugins").UserWithRole;
                        session: {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                    };
                }>>[];
                metadata: {
                    openapi: {
                        operationId: string;
                        summary: string;
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                user: {
                                                    $ref: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                    $Infer: {
                        body: {
                            userId: string;
                            role: "ACCOUNTANT" | "DISPATCH" | "OWNER" | "PRODUCTION" | "SALESMAN" | "SALES_MANAGER" | "WAREHOUSE" | ("ACCOUNTANT" | "DISPATCH" | "OWNER" | "PRODUCTION" | "SALESMAN" | "SALES_MANAGER" | "WAREHOUSE")[];
                        };
                    };
                };
            }, {
                user: import("better-auth/plugins").UserWithRole;
            }>;
            getUser: import("better-auth").StrictEndpoint<"/admin/get-user", {
                method: "GET";
                query: import("better-auth").ZodObject<{
                    id: import("better-auth").ZodString;
                }, import("zod/v4/core").$strip>;
                use: import("better-auth").Middleware<import("better-auth").MiddlewareOptions, (inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                    session: {
                        user: import("better-auth/plugins").UserWithRole;
                        session: {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                    };
                }>>[];
                metadata: {
                    openapi: {
                        operationId: string;
                        summary: string;
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                user: {
                                                    $ref: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            }, import("better-auth/plugins").UserWithRole>;
            createUser: import("better-auth").StrictEndpoint<"/admin/create-user", {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    email: import("better-auth").ZodString;
                    password: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    name: import("better-auth").ZodString;
                    role: import("better-auth").ZodOptional<import("better-auth").ZodUnion<readonly [import("better-auth").ZodString, import("better-auth").ZodArray<import("better-auth").ZodString>]>>;
                    data: import("better-auth").ZodOptional<import("better-auth").ZodRecord<import("better-auth").ZodString, import("better-auth").ZodAny>>;
                }, import("zod/v4/core").$strip>;
                metadata: {
                    openapi: {
                        operationId: string;
                        summary: string;
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                user: {
                                                    $ref: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                    $Infer: {
                        body: {
                            email: string;
                            password?: string | undefined;
                            name: string;
                            role?: "ACCOUNTANT" | "DISPATCH" | "OWNER" | "PRODUCTION" | "SALESMAN" | "SALES_MANAGER" | "WAREHOUSE" | ("ACCOUNTANT" | "DISPATCH" | "OWNER" | "PRODUCTION" | "SALESMAN" | "SALES_MANAGER" | "WAREHOUSE")[] | undefined;
                            data?: Record<string, any> | undefined;
                        };
                    };
                };
            }, {
                user: import("better-auth/plugins").UserWithRole;
            }>;
            adminUpdateUser: import("better-auth").StrictEndpoint<"/admin/update-user", {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    userId: import("better-auth").ZodCoercedString<unknown>;
                    data: import("better-auth").ZodRecord<import("better-auth").ZodAny, import("better-auth").ZodAny>;
                }, import("zod/v4/core").$strip>;
                use: import("better-auth").Middleware<import("better-auth").MiddlewareOptions, (inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                    session: {
                        user: import("better-auth/plugins").UserWithRole;
                        session: {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                    };
                }>>[];
                metadata: {
                    openapi: {
                        operationId: string;
                        summary: string;
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                user: {
                                                    $ref: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            }, import("better-auth/plugins").UserWithRole>;
            listUsers: import("better-auth").StrictEndpoint<"/admin/list-users", {
                method: "GET";
                use: import("better-auth").Middleware<import("better-auth").MiddlewareOptions, (inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                    session: {
                        user: import("better-auth/plugins").UserWithRole;
                        session: {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                    };
                }>>[];
                query: import("better-auth").ZodObject<{
                    searchValue: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    searchField: import("better-auth").ZodOptional<import("better-auth").ZodEnum<{
                        email: "email";
                        name: "name";
                    }>>;
                    searchOperator: import("better-auth").ZodOptional<import("better-auth").ZodEnum<{
                        contains: "contains";
                        starts_with: "starts_with";
                        ends_with: "ends_with";
                    }>>;
                    limit: import("better-auth").ZodOptional<import("better-auth").ZodUnion<[import("better-auth").ZodString, import("better-auth").ZodNumber]>>;
                    offset: import("better-auth").ZodOptional<import("better-auth").ZodUnion<[import("better-auth").ZodString, import("better-auth").ZodNumber]>>;
                    sortBy: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    sortDirection: import("better-auth").ZodOptional<import("better-auth").ZodEnum<{
                        asc: "asc";
                        desc: "desc";
                    }>>;
                    filterField: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    filterValue: import("better-auth").ZodOptional<import("better-auth").ZodUnion<[import("better-auth").ZodUnion<[import("better-auth").ZodUnion<[import("better-auth").ZodUnion<[import("better-auth").ZodString, import("better-auth").ZodNumber]>, import("better-auth").ZodBoolean]>, import("better-auth").ZodArray<import("better-auth").ZodString>]>, import("better-auth").ZodArray<import("better-auth").ZodNumber>]>>;
                    filterOperator: import("better-auth").ZodOptional<import("better-auth").ZodEnum<{
                        eq: "eq";
                        ne: "ne";
                        gt: "gt";
                        gte: "gte";
                        lt: "lt";
                        lte: "lte";
                        in: "in";
                        not_in: "not_in";
                        contains: "contains";
                        starts_with: "starts_with";
                        ends_with: "ends_with";
                    }>>;
                }, import("zod/v4/core").$strip>;
                metadata: {
                    openapi: {
                        operationId: string;
                        summary: string;
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                users: {
                                                    type: string;
                                                    items: {
                                                        $ref: string;
                                                    };
                                                };
                                                total: {
                                                    type: string;
                                                };
                                                limit: {
                                                    type: string;
                                                };
                                                offset: {
                                                    type: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            }, {
                users: import("better-auth/plugins").UserWithRole[];
                total: number;
            }>;
            listUserSessions: import("better-auth").StrictEndpoint<"/admin/list-user-sessions", {
                method: "POST";
                use: import("better-auth").Middleware<import("better-auth").MiddlewareOptions, (inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                    session: {
                        user: import("better-auth/plugins").UserWithRole;
                        session: {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                    };
                }>>[];
                body: import("better-auth").ZodObject<{
                    userId: import("better-auth").ZodCoercedString<unknown>;
                }, import("zod/v4/core").$strip>;
                metadata: {
                    openapi: {
                        operationId: string;
                        summary: string;
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                sessions: {
                                                    type: string;
                                                    items: {
                                                        $ref: string;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            }, {
                sessions: import("better-auth/plugins").SessionWithImpersonatedBy[];
            }>;
            unbanUser: import("better-auth").StrictEndpoint<"/admin/unban-user", {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    userId: import("better-auth").ZodCoercedString<unknown>;
                }, import("zod/v4/core").$strip>;
                use: import("better-auth").Middleware<import("better-auth").MiddlewareOptions, (inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                    session: {
                        user: import("better-auth/plugins").UserWithRole;
                        session: {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                    };
                }>>[];
                metadata: {
                    openapi: {
                        operationId: string;
                        summary: string;
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                user: {
                                                    $ref: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            }, {
                user: import("better-auth/plugins").UserWithRole;
            }>;
            banUser: import("better-auth").StrictEndpoint<"/admin/ban-user", {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    userId: import("better-auth").ZodCoercedString<unknown>;
                    banReason: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    banExpiresIn: import("better-auth").ZodOptional<import("better-auth").ZodNumber>;
                }, import("zod/v4/core").$strip>;
                use: import("better-auth").Middleware<import("better-auth").MiddlewareOptions, (inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                    session: {
                        user: import("better-auth/plugins").UserWithRole;
                        session: {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                    };
                }>>[];
                metadata: {
                    openapi: {
                        operationId: string;
                        summary: string;
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                user: {
                                                    $ref: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            }, {
                user: import("better-auth/plugins").UserWithRole;
            }>;
            impersonateUser: import("better-auth").StrictEndpoint<"/admin/impersonate-user", {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    userId: import("better-auth").ZodCoercedString<unknown>;
                }, import("zod/v4/core").$strip>;
                use: import("better-auth").Middleware<import("better-auth").MiddlewareOptions, (inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                    session: {
                        user: import("better-auth/plugins").UserWithRole;
                        session: {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                    };
                }>>[];
                metadata: {
                    openapi: {
                        operationId: string;
                        summary: string;
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                session: {
                                                    $ref: string;
                                                };
                                                user: {
                                                    $ref: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            }, {
                session: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: string;
                    expiresAt: Date;
                    token: string;
                    ipAddress?: string | null | undefined;
                    userAgent?: string | null | undefined;
                };
                user: import("better-auth/plugins").UserWithRole;
            }>;
            stopImpersonating: import("better-auth").StrictEndpoint<"/admin/stop-impersonating", {
                method: "POST";
                requireHeaders: true;
            }, {
                session: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: string;
                    expiresAt: Date;
                    token: string;
                    ipAddress?: string | null | undefined;
                    userAgent?: string | null | undefined;
                } & Record<string, any>;
                user: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    email: string;
                    emailVerified: boolean;
                    name: string;
                    image?: string | null | undefined;
                } & Record<string, any>;
            }>;
            revokeUserSession: import("better-auth").StrictEndpoint<"/admin/revoke-user-session", {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    sessionToken: import("better-auth").ZodString;
                }, import("zod/v4/core").$strip>;
                use: import("better-auth").Middleware<import("better-auth").MiddlewareOptions, (inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                    session: {
                        user: import("better-auth/plugins").UserWithRole;
                        session: {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                    };
                }>>[];
                metadata: {
                    openapi: {
                        operationId: string;
                        summary: string;
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                success: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            }, {
                success: boolean;
            }>;
            revokeUserSessions: import("better-auth").StrictEndpoint<"/admin/revoke-user-sessions", {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    userId: import("better-auth").ZodCoercedString<unknown>;
                }, import("zod/v4/core").$strip>;
                use: import("better-auth").Middleware<import("better-auth").MiddlewareOptions, (inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                    session: {
                        user: import("better-auth/plugins").UserWithRole;
                        session: {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                    };
                }>>[];
                metadata: {
                    openapi: {
                        operationId: string;
                        summary: string;
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                success: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            }, {
                success: boolean;
            }>;
            removeUser: import("better-auth").StrictEndpoint<"/admin/remove-user", {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    userId: import("better-auth").ZodCoercedString<unknown>;
                }, import("zod/v4/core").$strip>;
                use: import("better-auth").Middleware<import("better-auth").MiddlewareOptions, (inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                    session: {
                        user: import("better-auth/plugins").UserWithRole;
                        session: {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                    };
                }>>[];
                metadata: {
                    openapi: {
                        operationId: string;
                        summary: string;
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                success: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            }, {
                success: boolean;
            }>;
            setUserPassword: import("better-auth").StrictEndpoint<"/admin/set-user-password", {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    newPassword: import("better-auth").ZodString;
                    userId: import("better-auth").ZodCoercedString<unknown>;
                }, import("zod/v4/core").$strip>;
                use: import("better-auth").Middleware<import("better-auth").MiddlewareOptions, (inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                    session: {
                        user: import("better-auth/plugins").UserWithRole;
                        session: {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                    };
                }>>[];
                metadata: {
                    openapi: {
                        operationId: string;
                        summary: string;
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                status: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            }, {
                status: boolean;
            }>;
            userHasPermission: import("better-auth").StrictEndpoint<"/admin/has-permission", {
                method: "POST";
                body: import("better-auth").ZodIntersection<import("better-auth").ZodObject<{
                    userId: import("better-auth").ZodOptional<import("better-auth").ZodCoercedString<unknown>>;
                    role: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                }, import("zod/v4/core").$strip>, import("better-auth").ZodXor<readonly [import("better-auth").ZodObject<{
                    permission: import("better-auth").ZodRecord<import("better-auth").ZodString, import("better-auth").ZodArray<import("better-auth").ZodString>>;
                }, import("zod/v4/core").$strip>, import("better-auth").ZodObject<{
                    permissions: import("better-auth").ZodRecord<import("better-auth").ZodString, import("better-auth").ZodArray<import("better-auth").ZodString>>;
                }, import("zod/v4/core").$strip>]>>;
                metadata: {
                    openapi: {
                        description: string;
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        properties: {
                                            permissions: {
                                                type: string;
                                                description: string;
                                            };
                                        };
                                        required: string[];
                                    };
                                };
                            };
                        };
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                error: {
                                                    type: string;
                                                };
                                                success: {
                                                    type: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                    $Infer: {
                        body: {
                            permissions: {
                                readonly customer?: ("create" | "delete" | "read" | "update")[] | undefined;
                                readonly product?: ("create" | "delete" | "read" | "update")[] | undefined;
                                readonly salesOrder?: ("cancel" | "create" | "dispatch" | "read" | "update")[] | undefined;
                                readonly invoice?: ("cancel" | "create" | "export" | "read" | "update")[] | undefined;
                                readonly payment?: ("approve" | "create" | "read" | "update")[] | undefined;
                                readonly inventory?: ("adjust" | "create" | "read" | "update")[] | undefined;
                                readonly manufacturing?: ("approve" | "create" | "read" | "update")[] | undefined;
                                readonly salesman?: ("create" | "delete" | "read" | "update")[] | undefined;
                                readonly visit?: ("create" | "read" | "update")[] | undefined;
                                readonly employee?: ("create" | "delete" | "read" | "update")[] | undefined;
                                readonly expense?: ("approve" | "create" | "read" | "update")[] | undefined;
                                readonly complaint?: ("create" | "read" | "resolve" | "update")[] | undefined;
                                readonly ledger?: ("export" | "read")[] | undefined;
                                readonly report?: ("export" | "read")[] | undefined;
                            };
                        } & {
                            userId?: string | undefined;
                            role?: "ACCOUNTANT" | "DISPATCH" | "OWNER" | "PRODUCTION" | "SALESMAN" | "SALES_MANAGER" | "WAREHOUSE" | undefined;
                        };
                    };
                };
            }, {
                error: null;
                success: boolean;
            }>;
        };
        $ERROR_CODES: {
            USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: import("better-auth").RawError<"USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL">;
            FAILED_TO_CREATE_USER: import("better-auth").RawError<"FAILED_TO_CREATE_USER">;
            USER_ALREADY_EXISTS: import("better-auth").RawError<"USER_ALREADY_EXISTS">;
            YOU_CANNOT_BAN_YOURSELF: import("better-auth").RawError<"YOU_CANNOT_BAN_YOURSELF">;
            YOU_ARE_NOT_ALLOWED_TO_CHANGE_USERS_ROLE: import("better-auth").RawError<"YOU_ARE_NOT_ALLOWED_TO_CHANGE_USERS_ROLE">;
            YOU_ARE_NOT_ALLOWED_TO_CREATE_USERS: import("better-auth").RawError<"YOU_ARE_NOT_ALLOWED_TO_CREATE_USERS">;
            YOU_ARE_NOT_ALLOWED_TO_LIST_USERS: import("better-auth").RawError<"YOU_ARE_NOT_ALLOWED_TO_LIST_USERS">;
            YOU_ARE_NOT_ALLOWED_TO_LIST_USERS_SESSIONS: import("better-auth").RawError<"YOU_ARE_NOT_ALLOWED_TO_LIST_USERS_SESSIONS">;
            YOU_ARE_NOT_ALLOWED_TO_BAN_USERS: import("better-auth").RawError<"YOU_ARE_NOT_ALLOWED_TO_BAN_USERS">;
            YOU_ARE_NOT_ALLOWED_TO_IMPERSONATE_USERS: import("better-auth").RawError<"YOU_ARE_NOT_ALLOWED_TO_IMPERSONATE_USERS">;
            YOU_ARE_NOT_ALLOWED_TO_REVOKE_USERS_SESSIONS: import("better-auth").RawError<"YOU_ARE_NOT_ALLOWED_TO_REVOKE_USERS_SESSIONS">;
            YOU_ARE_NOT_ALLOWED_TO_DELETE_USERS: import("better-auth").RawError<"YOU_ARE_NOT_ALLOWED_TO_DELETE_USERS">;
            YOU_ARE_NOT_ALLOWED_TO_SET_USERS_PASSWORD: import("better-auth").RawError<"YOU_ARE_NOT_ALLOWED_TO_SET_USERS_PASSWORD">;
            BANNED_USER: import("better-auth").RawError<"BANNED_USER">;
            YOU_ARE_NOT_ALLOWED_TO_GET_USER: import("better-auth").RawError<"YOU_ARE_NOT_ALLOWED_TO_GET_USER">;
            NO_DATA_TO_UPDATE: import("better-auth").RawError<"NO_DATA_TO_UPDATE">;
            YOU_ARE_NOT_ALLOWED_TO_UPDATE_USERS: import("better-auth").RawError<"YOU_ARE_NOT_ALLOWED_TO_UPDATE_USERS">;
            YOU_CANNOT_REMOVE_YOURSELF: import("better-auth").RawError<"YOU_CANNOT_REMOVE_YOURSELF">;
            YOU_ARE_NOT_ALLOWED_TO_SET_NON_EXISTENT_VALUE: import("better-auth").RawError<"YOU_ARE_NOT_ALLOWED_TO_SET_NON_EXISTENT_VALUE">;
            YOU_CANNOT_IMPERSONATE_ADMINS: import("better-auth").RawError<"YOU_CANNOT_IMPERSONATE_ADMINS">;
            INVALID_ROLE_TYPE: import("better-auth").RawError<"INVALID_ROLE_TYPE">;
            YOU_ARE_NOT_ALLOWED_TO_SET_USERS_EMAIL: import("better-auth").RawError<"YOU_ARE_NOT_ALLOWED_TO_SET_USERS_EMAIL">;
            PASSWORD_CANNOT_BE_UPDATED_VIA_UPDATE_USER: import("better-auth").RawError<"PASSWORD_CANNOT_BE_UPDATED_VIA_UPDATE_USER">;
        };
        schema: {
            user: {
                fields: {
                    role: {
                        type: "string";
                        required: false;
                        input: false;
                    };
                    banned: {
                        type: "boolean";
                        defaultValue: false;
                        required: false;
                        input: false;
                    };
                    banReason: {
                        type: "string";
                        required: false;
                        input: false;
                    };
                    banExpires: {
                        type: "date";
                        required: false;
                        input: false;
                    };
                };
            };
            session: {
                fields: {
                    impersonatedBy: {
                        type: "string";
                        required: false;
                        input: false;
                    };
                };
            };
        };
        options: NoInfer<{
            ac: {
                newRole<const TRoleStatements extends import("better-auth/plugins").Statements>(statements: import("better-auth/plugins").RoleInput<{
                    readonly customer: readonly ["create", "read", "update", "delete"];
                    readonly product: readonly ["create", "read", "update", "delete"];
                    readonly salesOrder: readonly ["create", "read", "update", "cancel", "dispatch"];
                    readonly invoice: readonly ["create", "read", "update", "cancel", "export"];
                    readonly payment: readonly ["create", "read", "update", "approve"];
                    readonly inventory: readonly ["create", "read", "update", "adjust"];
                    readonly manufacturing: readonly ["create", "read", "update", "approve"];
                    readonly salesman: readonly ["create", "read", "update", "delete"];
                    readonly visit: readonly ["create", "read", "update"];
                    readonly employee: readonly ["create", "read", "update", "delete"];
                    readonly expense: readonly ["create", "read", "update", "approve"];
                    readonly complaint: readonly ["create", "read", "update", "resolve"];
                    readonly ledger: readonly ["read", "export"];
                    readonly report: readonly ["read", "export"];
                }, TRoleStatements>): import("better-auth/plugins").Role<import("better-auth/plugins").ExactRoleStatements<TRoleStatements>, {
                    readonly customer: readonly ["create", "read", "update", "delete"];
                    readonly product: readonly ["create", "read", "update", "delete"];
                    readonly salesOrder: readonly ["create", "read", "update", "cancel", "dispatch"];
                    readonly invoice: readonly ["create", "read", "update", "cancel", "export"];
                    readonly payment: readonly ["create", "read", "update", "approve"];
                    readonly inventory: readonly ["create", "read", "update", "adjust"];
                    readonly manufacturing: readonly ["create", "read", "update", "approve"];
                    readonly salesman: readonly ["create", "read", "update", "delete"];
                    readonly visit: readonly ["create", "read", "update"];
                    readonly employee: readonly ["create", "read", "update", "delete"];
                    readonly expense: readonly ["create", "read", "update", "approve"];
                    readonly complaint: readonly ["create", "read", "update", "resolve"];
                    readonly ledger: readonly ["read", "export"];
                    readonly report: readonly ["read", "export"];
                }>;
                statements: {
                    readonly customer: readonly ["create", "read", "update", "delete"];
                    readonly product: readonly ["create", "read", "update", "delete"];
                    readonly salesOrder: readonly ["create", "read", "update", "cancel", "dispatch"];
                    readonly invoice: readonly ["create", "read", "update", "cancel", "export"];
                    readonly payment: readonly ["create", "read", "update", "approve"];
                    readonly inventory: readonly ["create", "read", "update", "adjust"];
                    readonly manufacturing: readonly ["create", "read", "update", "approve"];
                    readonly salesman: readonly ["create", "read", "update", "delete"];
                    readonly visit: readonly ["create", "read", "update"];
                    readonly employee: readonly ["create", "read", "update", "delete"];
                    readonly expense: readonly ["create", "read", "update", "approve"];
                    readonly complaint: readonly ["create", "read", "update", "resolve"];
                    readonly ledger: readonly ["read", "export"];
                    readonly report: readonly ["read", "export"];
                };
            };
            roles: {
                OWNER: import("better-auth/plugins").Role<import("better-auth/plugins").ExactRoleStatements<{
                    readonly customer: ["create", "read", "update", "delete"];
                    readonly product: ["create", "read", "update", "delete"];
                    readonly salesOrder: ["create", "read", "update", "cancel", "dispatch"];
                    readonly invoice: ["create", "read", "update", "cancel", "export"];
                    readonly payment: ["create", "read", "update", "approve"];
                    readonly inventory: ["create", "read", "update", "adjust"];
                    readonly manufacturing: ["create", "read", "update", "approve"];
                    readonly salesman: ["create", "read", "update", "delete"];
                    readonly visit: ["create", "read", "update"];
                    readonly employee: ["create", "read", "update", "delete"];
                    readonly expense: ["create", "read", "update", "approve"];
                    readonly complaint: ["create", "read", "update", "resolve"];
                    readonly ledger: ["read", "export"];
                    readonly report: ["read", "export"];
                }>, {
                    readonly customer: readonly ["create", "read", "update", "delete"];
                    readonly product: readonly ["create", "read", "update", "delete"];
                    readonly salesOrder: readonly ["create", "read", "update", "cancel", "dispatch"];
                    readonly invoice: readonly ["create", "read", "update", "cancel", "export"];
                    readonly payment: readonly ["create", "read", "update", "approve"];
                    readonly inventory: readonly ["create", "read", "update", "adjust"];
                    readonly manufacturing: readonly ["create", "read", "update", "approve"];
                    readonly salesman: readonly ["create", "read", "update", "delete"];
                    readonly visit: readonly ["create", "read", "update"];
                    readonly employee: readonly ["create", "read", "update", "delete"];
                    readonly expense: readonly ["create", "read", "update", "approve"];
                    readonly complaint: readonly ["create", "read", "update", "resolve"];
                    readonly ledger: readonly ["read", "export"];
                    readonly report: readonly ["read", "export"];
                }>;
                ACCOUNTANT: import("better-auth/plugins").Role<import("better-auth/plugins").ExactRoleStatements<{
                    readonly customer: ["read"];
                    readonly product: ["read"];
                    readonly salesOrder: ["read"];
                    readonly invoice: ["create", "read", "update", "cancel", "export"];
                    readonly payment: ["create", "read", "update", "approve"];
                    readonly inventory: ["read"];
                    readonly expense: ["create", "read", "update", "approve"];
                    readonly complaint: ["read"];
                    readonly ledger: ["read", "export"];
                    readonly report: ["read", "export"];
                }>, {
                    readonly customer: readonly ["create", "read", "update", "delete"];
                    readonly product: readonly ["create", "read", "update", "delete"];
                    readonly salesOrder: readonly ["create", "read", "update", "cancel", "dispatch"];
                    readonly invoice: readonly ["create", "read", "update", "cancel", "export"];
                    readonly payment: readonly ["create", "read", "update", "approve"];
                    readonly inventory: readonly ["create", "read", "update", "adjust"];
                    readonly manufacturing: readonly ["create", "read", "update", "approve"];
                    readonly salesman: readonly ["create", "read", "update", "delete"];
                    readonly visit: readonly ["create", "read", "update"];
                    readonly employee: readonly ["create", "read", "update", "delete"];
                    readonly expense: readonly ["create", "read", "update", "approve"];
                    readonly complaint: readonly ["create", "read", "update", "resolve"];
                    readonly ledger: readonly ["read", "export"];
                    readonly report: readonly ["read", "export"];
                }>;
                SALES_MANAGER: import("better-auth/plugins").Role<import("better-auth/plugins").ExactRoleStatements<{
                    readonly customer: ["create", "read", "update"];
                    readonly product: ["read"];
                    readonly salesOrder: ["create", "read", "update", "cancel", "dispatch"];
                    readonly invoice: ["read", "export"];
                    readonly payment: ["read"];
                    readonly inventory: ["read"];
                    readonly salesman: ["read", "update"];
                    readonly visit: ["read", "update"];
                    readonly complaint: ["read", "update", "resolve"];
                    readonly report: ["read", "export"];
                }>, {
                    readonly customer: readonly ["create", "read", "update", "delete"];
                    readonly product: readonly ["create", "read", "update", "delete"];
                    readonly salesOrder: readonly ["create", "read", "update", "cancel", "dispatch"];
                    readonly invoice: readonly ["create", "read", "update", "cancel", "export"];
                    readonly payment: readonly ["create", "read", "update", "approve"];
                    readonly inventory: readonly ["create", "read", "update", "adjust"];
                    readonly manufacturing: readonly ["create", "read", "update", "approve"];
                    readonly salesman: readonly ["create", "read", "update", "delete"];
                    readonly visit: readonly ["create", "read", "update"];
                    readonly employee: readonly ["create", "read", "update", "delete"];
                    readonly expense: readonly ["create", "read", "update", "approve"];
                    readonly complaint: readonly ["create", "read", "update", "resolve"];
                    readonly ledger: readonly ["read", "export"];
                    readonly report: readonly ["read", "export"];
                }>;
                SALESMAN: import("better-auth/plugins").Role<import("better-auth/plugins").ExactRoleStatements<{
                    readonly customer: ["create", "read", "update"];
                    readonly product: ["read"];
                    readonly salesOrder: ["create", "read", "update"];
                    readonly invoice: ["read"];
                    readonly payment: ["create", "read"];
                    readonly visit: ["create", "read", "update"];
                    readonly complaint: ["create", "read", "update"];
                }>, {
                    readonly customer: readonly ["create", "read", "update", "delete"];
                    readonly product: readonly ["create", "read", "update", "delete"];
                    readonly salesOrder: readonly ["create", "read", "update", "cancel", "dispatch"];
                    readonly invoice: readonly ["create", "read", "update", "cancel", "export"];
                    readonly payment: readonly ["create", "read", "update", "approve"];
                    readonly inventory: readonly ["create", "read", "update", "adjust"];
                    readonly manufacturing: readonly ["create", "read", "update", "approve"];
                    readonly salesman: readonly ["create", "read", "update", "delete"];
                    readonly visit: readonly ["create", "read", "update"];
                    readonly employee: readonly ["create", "read", "update", "delete"];
                    readonly expense: readonly ["create", "read", "update", "approve"];
                    readonly complaint: readonly ["create", "read", "update", "resolve"];
                    readonly ledger: readonly ["read", "export"];
                    readonly report: readonly ["read", "export"];
                }>;
                WAREHOUSE: import("better-auth/plugins").Role<import("better-auth/plugins").ExactRoleStatements<{
                    readonly product: ["read"];
                    readonly salesOrder: ["read", "update", "dispatch"];
                    readonly invoice: ["read"];
                    readonly inventory: ["create", "read", "update", "adjust"];
                    readonly report: ["read"];
                }>, {
                    readonly customer: readonly ["create", "read", "update", "delete"];
                    readonly product: readonly ["create", "read", "update", "delete"];
                    readonly salesOrder: readonly ["create", "read", "update", "cancel", "dispatch"];
                    readonly invoice: readonly ["create", "read", "update", "cancel", "export"];
                    readonly payment: readonly ["create", "read", "update", "approve"];
                    readonly inventory: readonly ["create", "read", "update", "adjust"];
                    readonly manufacturing: readonly ["create", "read", "update", "approve"];
                    readonly salesman: readonly ["create", "read", "update", "delete"];
                    readonly visit: readonly ["create", "read", "update"];
                    readonly employee: readonly ["create", "read", "update", "delete"];
                    readonly expense: readonly ["create", "read", "update", "approve"];
                    readonly complaint: readonly ["create", "read", "update", "resolve"];
                    readonly ledger: readonly ["read", "export"];
                    readonly report: readonly ["read", "export"];
                }>;
                PRODUCTION: import("better-auth/plugins").Role<import("better-auth/plugins").ExactRoleStatements<{
                    readonly product: ["read"];
                    readonly inventory: ["create", "read", "update", "adjust"];
                    readonly manufacturing: ["create", "read", "update", "approve"];
                    readonly report: ["read"];
                }>, {
                    readonly customer: readonly ["create", "read", "update", "delete"];
                    readonly product: readonly ["create", "read", "update", "delete"];
                    readonly salesOrder: readonly ["create", "read", "update", "cancel", "dispatch"];
                    readonly invoice: readonly ["create", "read", "update", "cancel", "export"];
                    readonly payment: readonly ["create", "read", "update", "approve"];
                    readonly inventory: readonly ["create", "read", "update", "adjust"];
                    readonly manufacturing: readonly ["create", "read", "update", "approve"];
                    readonly salesman: readonly ["create", "read", "update", "delete"];
                    readonly visit: readonly ["create", "read", "update"];
                    readonly employee: readonly ["create", "read", "update", "delete"];
                    readonly expense: readonly ["create", "read", "update", "approve"];
                    readonly complaint: readonly ["create", "read", "update", "resolve"];
                    readonly ledger: readonly ["read", "export"];
                    readonly report: readonly ["read", "export"];
                }>;
                DISPATCH: import("better-auth/plugins").Role<import("better-auth/plugins").ExactRoleStatements<{
                    readonly customer: ["read"];
                    readonly product: ["read"];
                    readonly salesOrder: ["read", "dispatch"];
                    readonly invoice: ["read"];
                    readonly inventory: ["read", "update"];
                    readonly report: ["read"];
                }>, {
                    readonly customer: readonly ["create", "read", "update", "delete"];
                    readonly product: readonly ["create", "read", "update", "delete"];
                    readonly salesOrder: readonly ["create", "read", "update", "cancel", "dispatch"];
                    readonly invoice: readonly ["create", "read", "update", "cancel", "export"];
                    readonly payment: readonly ["create", "read", "update", "approve"];
                    readonly inventory: readonly ["create", "read", "update", "adjust"];
                    readonly manufacturing: readonly ["create", "read", "update", "approve"];
                    readonly salesman: readonly ["create", "read", "update", "delete"];
                    readonly visit: readonly ["create", "read", "update"];
                    readonly employee: readonly ["create", "read", "update", "delete"];
                    readonly expense: readonly ["create", "read", "update", "approve"];
                    readonly complaint: readonly ["create", "read", "update", "resolve"];
                    readonly ledger: readonly ["read", "export"];
                    readonly report: readonly ["read", "export"];
                }>;
            };
        }>;
    }];
    user: {
        additionalFields: {
            role: {
                type: ("ACCOUNTANT" | "DISPATCH" | "OWNER" | "PRODUCTION" | "SALESMAN" | "SALES_MANAGER" | "WAREHOUSE")[];
                required: false;
                input: false;
                defaultValue: string;
            };
        };
    };
    databaseHooks: {
        user: {
            create: {
                before: (user: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    email: string;
                    emailVerified: boolean;
                    name: string;
                    image?: string | null | undefined;
                } & Record<string, unknown>) => Promise<{
                    data: {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        email: string;
                        emailVerified: boolean;
                        name: string;
                        image?: string | null | undefined;
                        role: string;
                    };
                }>;
            };
        };
    };
}>;
//# sourceMappingURL=auth.d.ts.map