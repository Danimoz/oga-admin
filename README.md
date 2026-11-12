# Oga Admin

A model-driven admin interface prototype for Next.js, React and TypeScript. Oga Admin explores how Prisma model metadata can generate admin configuration and form fields, reducing repeated UI code for database models.

## Implemented scope

- Extract model names and field metadata from Prisma's data model.
- Generate model configuration with inclusion, exclusion and label options.
- Render an admin model index and model-specific create forms.
- Map Prisma scalar types and field names to input types.
- Provide a Prisma adapter with CRUD and paginated list operations.
- Demonstrate integration through a Next.js catch-all admin route.

This is an in-progress prototype. The adapter exposes more operations than the visible UI, which concentrates on navigation and creation. It is not a complete, production-ready admin product.

## Architecture and tradeoffs

The `ORMAdapter` interface defines persistence operations separately from the React interface. `PrismaAdapter` supplies the current implementation. That boundary gives future adapters a contract; additional ORM support is not implemented merely because an interface exists.

Configuration generation reads `Prisma.dmmf`, avoiding manually repeated field definitions at the cost of coupling introspection to the generated Prisma client. The host app owns its client and initializes the server-side creation path.

The form helpers exclude IDs, fields with defaults and relation fields from the editable field list. This keeps the initial scalar-form implementation small; richer relation editing and a complete CRUD interface need additional work.

## Repository map

| Workspace | Purpose |
| --- | --- |
| [`packages/oga-admin`](packages/oga-admin) | Components, adapter, types and introspection |
| [`apps/web`](apps/web) | Next.js host app and example Prisma schema |
| [`apps/docs`](apps/docs) | Documentation app scaffold |
| [`packages/ui`](packages/ui) | Shared React UI scaffold |
| [`packages/eslint-config`](packages/eslint-config) | Shared ESLint configuration |
| [`packages/typescript-config`](packages/typescript-config) | Shared TypeScript configuration |

## Read the implementation

- [Public exports](packages/oga-admin/src/index.tsx)
- [Adapter and configuration types](packages/oga-admin/src/types.ts)
- [Prisma adapter](packages/oga-admin/src/adapters/orm/PrismaAdapter.ts)
- [Introspection and field mapping](packages/oga-admin/src/lib/prismaUtils.ts)
- [Admin panel](packages/oga-admin/src/components/AdminPanel.tsx)
- [Host route](apps/web/app/admin/%5B%5B...admin%5D%5D/page.tsx)

## Local development

The repository uses npm workspaces and Turborepo. Package metadata declares Node.js 18+ and npm 9.6.4; use a compatible environment for this historical snapshot.

From the repository root:

```sh
npm ci
npx prisma generate --schema apps/web/prisma/schema.prisma
npm run build --workspace @repo/oga-admin
npm run dev --workspace web
```

Review the sample Prisma schema and configure its local database before generating the client. The host imports generated styles from the library's `dist` directory, so build the library before evaluating that integration.

Workspace-wide commands are `npx turbo run build` and `npx turbo run lint`, which delegate to the scripts each workspace declares.

## Validation and current limits

The library declares build, formatting and export-check commands. This documentation does not claim a passing automated test suite or a hosted demo. Useful next tests would cover metadata mapping, adapter filtering/pagination and record creation through the host app. Host applications must supply authentication and authorization around admin access.
