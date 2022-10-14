/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

// Auth
Route.group(() => {
  Route.post('/login', 'AuthController.login')
  Route.post('/logout', 'AuthController.logout')
  Route.post('/register', 'AuthController.register')
})

// Users
Route.group(() => {
  Route.get('/users', 'UsersController.index')
  Route.get('/users/:id', 'UsersController.find')
  Route.put('/users/:id', 'UsersController.update')
}).middleware('auth')

// Events
Route.group(() => {
  Route.get('/events', 'EventsController.index')
  Route.post('/events', 'EventsController.store')
  Route.get('/events/cycle/:cycle', 'EventsController.cycleList')
  Route.get('/events/:id', 'EventsController.find')
  Route.put('/events/:id', 'EventsController.update')
  Route.put('/events/:id/change_status', 'EventsController.changeStatus')
}).middleware('auth')
