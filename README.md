# Seekr

Seekr is a full-stack lost-and-found application. Users can report lost or found items, pin locations on a map, review possible matches, claim matched items, and close cases after confirmation. Administrators can manage all lost and found reports from a protected admin area.

The repository is split into two apps:

- `API/seekr.API/Seekr` - ASP.NET Core Web API for authentication, reports, matching, and admin data.
- `UI/seekr` - Angular frontend.

## Features

- User login with ASP.NET Core Identity.
- JWT authentication stored in an HTTP-only cookie named `jwt_token`.
- Role-based access for `User` and `Administrator`.
- Lost item reporting.
- Found item reporting.
- Leaflet map integration with OpenStreetMap tiles.
- Current-location and searched-location selection.
- User submissions page with filters and pagination.
- Match detection between lost and found reports.
- Claim, confirm, reject, and resolve match workflow.
- Admin report list with filters, pagination, edit, and delete actions.
- Swagger UI for API exploration in development.

## Tech Stack

### Backend

- .NET 8
- ASP.NET Core Web API
- ASP.NET Core Identity
- JWT Bearer authentication
- Entity Framework Core
- SQL Server
- Swashbuckle / Swagger
- LinqKit for dynamic predicates

### Frontend

- Angular 19
- TypeScript
- RxJS
- Angular Router
- Angular Reactive Forms and Template-driven Forms
- Bootstrap 5 via CDN
- Leaflet and Leaflet geocoder via CDN

## Repository Structure

```text
seekr/
+-- API/
|   +-- seekr.API/
|       +-- Seekr/
|           +-- Controllers/
|           +-- Data/
|           +-- Migrations/
|           +-- Models/
|           |   +-- DomainModels/
|           |   +-- DTO/
|           +-- Repositories/
|           |   +-- Implementation/
|           |   +-- Interface/
|           +-- Program.cs
|           +-- Seekr.csproj
+-- UI/
    +-- seekr/
        +-- public/
        +-- src/
        |   +-- app/
        |   |   +-- core/
        |   |   +-- features/
        |   |   +-- shared/
        |   +-- environment/
        |   +-- index.html
        |   +-- styles.css
        +-- angular.json
        +-- package.json
```

## Application Flow

1. A user logs in.
2. The API returns user details and sets a secure HTTP-only JWT cookie.
3. The user creates a lost or found report.
4. The report stores title, description, item type, image URL, latitude, longitude, location, date, contact info, radius, status, and owner user id.
5. The submissions page compares the user's reports with reports from other users.
6. A match is detected when item title and distance/radius conditions align.
7. The owner can claim a matched item.
8. The finder can confirm or reject the claim.
9. After confirmation, the owner marks the item as received.
10. The match becomes resolved.

## Match Status Workflow

```text
Pending
  -> Claimed
  -> Confirmed
  -> Resolved
```

Rejected claims are moved back to `Pending`.

The UI shows different top status panels for each important state so both the lost-item user and found-item user know what to do next.

## Prerequisites

- .NET 8 SDK
- Node.js and npm
- SQL Server or SQL Server LocalDB
- A browser that allows localhost geolocation
- Optional: Angular CLI installed globally

Check versions:

```bash
dotnet --version
node --version
npm --version
```

## Backend Setup

Go to the API project:

```bash
cd API/seekr.API/Seekr
```

Restore packages:

```bash
dotnet restore
```

Configure `appsettings.json` or user secrets with:

```json
{
  "ConnectionStrings": {
    "SeekrConnectionString": "YOUR_SQL_SERVER_CONNECTION_STRING"
  },
  "Jwt": {
    "Key": "YOUR_LONG_SIGNING_KEY",
    "Issuer": "YOUR_ISSUER",
    "Audience": "YOUR_AUDIENCE"
  }
}
```

Apply database migrations for both contexts:

```bash
dotnet ef database update --context ApplicationDBContext
dotnet ef database update --context AuthDBContext
```

Run the API:

```bash
dotnet run
```

The launch profile is configured for:

```text
https://localhost:50542
https://localhost:50543
```

Swagger is available in development at:

```text
https://localhost:50542/swagger
```

## Frontend Setup

Go to the Angular app:

```bash
cd UI/seekr
```

Install packages:

```bash
npm install
```

Check the API URL in:

```text
UI/seekr/src/environment/environment.ts
```

Current value:

```ts
export const environment = {
  apiUrl: 'https://localhost:50542/api'
};
```

Run the UI:

```bash
npm run start
```

Open:

```text
http://localhost:4200
```

## Running Both Apps Locally

Terminal 1:

```bash
cd API/seekr.API/Seekr
dotnet run
```

Terminal 2:

```bash
cd UI/seekr
npm run start
```

Then open:

```text
http://localhost:4200
```

The API CORS policy currently allows:

```text
http://localhost:4200
```

## Useful Commands

Backend:

```bash
dotnet restore
dotnet build
dotnet run
dotnet ef database update --context ApplicationDBContext
dotnet ef database update --context AuthDBContext
```

Frontend:

```bash
npm install
npm run start
npm run build
npm run test
```

## Frontend Routes

| Route | Component | Access |
| --- | --- | --- |
| `/` | Home | Public |
| `/Login` | Login | Public |
| `/lostandfound` | Report lost/found item | User |
| `/submissions` | User submissions | User |
| `/matchfound/:latitude/:longitude/:matchedId/:type/:currentId` | Match review | User |
| `/admin/lostandfoundlist` | Admin report list | Administrator |
| `/admin/lostandfoundlist/editlostandfound/:type/:id` | Admin edit report | Administrator |

## API Endpoints

Base URL:

```text
https://localhost:50542/api
```

### Auth

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/Auth/login` | Login and set JWT cookie |
| `POST` | `/Auth/register` | Register a user with the `User` role |
| `GET` | `/Auth/me` | Get current authenticated user details |
| `POST` | `/Auth/logout` | Clear authentication cookie |

### Lost Reports

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/Lost` | Create lost report |
| `GET` | `/Lost` | Get current user's lost reports |
| `GET` | `/Lost/{id}` | Get lost report by id |
| `GET` | `/Lost/GetLostList` | Admin lost report list |
| `PUT` | `/Lost` | Admin update lost report |
| `DELETE` | `/Lost/{id}` | Admin delete lost report |
| `PUT` | `/Lost/UpdateLostStatus/{status}/{matchedId}/{currentId}` | Update lost-side match status |

### Found Reports

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/Found` | Create found report |
| `GET` | `/Found` | Get current user's found reports |
| `GET` | `/Found/{id}` | Get found report by id |
| `GET` | `/Found/GetFoundList` | Admin found report list |
| `PUT` | `/Found` | Admin update found report |
| `DELETE` | `/Found/{id}` | Admin delete found report |
| `PUT` | `/Found/UpdateFoundStatus/{status}/{matchedId}/{currentId}` | Update found-side match status |

### Submissions

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/Submissions` | Get filtered current-user submissions with match info |
| `GET` | `/Submissions/count` | Get current-user submission count |

### Admin Lost and Found List

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/admin/LostandFoundList` | Get filtered lost/found admin list |
| `GET` | `/admin/LostandFoundList/Count` | Get admin list count |

## Data Model Overview

Lost and found reports share the same main shape:

- `Id`
- `Title`
- `Description`
- `Type`
- `ImageURL`
- `Latitude`
- `Longitude`
- `Location`
- `DatePosted`
- `ContactInfo`
- `Date`
- `radius`
- `UserId`
- `Status`
- `ClaimedBy`

Authentication data is stored through ASP.NET Core Identity in `AuthDBContext`.

Lost/found report data is stored through `ApplicationDBContext`.

## Authentication and Roles

The API uses ASP.NET Core Identity with two seeded roles:

- `User`
- `Administrator`

New registrations receive the `User` role.

The development seed creates an admin account in the auth database. Change or remove seed credentials before deploying publicly.

## Map and Location

The frontend map uses Leaflet with OpenStreetMap tiles. Users can:

- Let the browser provide current location.
- Search for a location through the Leaflet geocoder.
- Drag the marker to fine-tune coordinates.

The selected coordinates are passed into the lost/found services and saved with the report.

## Matching Logic

The submissions API:

- Loads the current user's lost and found reports.
- Loads reports from other users.
- Compares lost items with found items.
- Uses distance between coordinates with the report radius.
- Marks a submission as matched when the candidate item qualifies.
- Returns matched id, matched coordinates, and current report id for the match review page.

Distance is calculated with the Haversine formula and measured in meters.

## Notes for Development

- `UI/seekr/src/index.html` loads Bootstrap, Leaflet, and Leaflet geocoder from CDNs.
- The API reads JWT configuration from `Jwt:Key`, `Jwt:Issuer`, and `Jwt:Audience`.
- The API reads the database connection from `ConnectionStrings:SeekrConnectionString`.
- The JWT cookie is secure, HTTP-only, and sent with `withCredentials: true` from Angular services.
- The frontend and backend ports must match CORS and `environment.ts`.

## Troubleshooting

### The frontend cannot call the API

- Confirm the API is running on `https://localhost:50542`.
- Confirm `UI/seekr/src/environment/environment.ts` points to the correct API URL.
- Confirm the frontend is running on `http://localhost:4200`.
- Confirm the API CORS origin matches the frontend URL.

### Login succeeds in Swagger but not from Angular

- Check that the browser accepts the secure cookie.
- Use `https://localhost:50542` for the API.
- Make sure Angular requests use `withCredentials: true`.

### Database errors on startup

- Check `SeekrConnectionString`.
- Run both EF Core migration commands.
- Confirm SQL Server or LocalDB is running.

### Map does not show the current location

- Allow browser geolocation permissions.
- Use localhost or HTTPS.
- Search manually in the map search box if geolocation is unavailable.
