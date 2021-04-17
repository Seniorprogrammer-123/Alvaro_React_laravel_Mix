<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Auth::routes();
// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::post('/login', [App\Http\Controllers\AuthController::class, 'login']);
Route::post('/signup', [App\Http\Controllers\AuthController::class, 'signup']);
Route::resource('/report', 'App\Http\Controllers\ReportController');

Route::get('/users/{id}/edit', [App\Http\Controllers\UserController::class, 'edit']);
Route::put('/users/{id}', [App\Http\Controllers\UserController::class, 'update']);
Route::put('/labs/{id}', [App\Http\Controllers\UserController::class, 'labupdate']);
Route::put('/admins/{id}', [App\Http\Controllers\UserController::class, 'adminupdate']);
Route::post('/users/signin', [App\Http\Controllers\UserController::class, 'getUser']);
Route::get('/verifyToken/{token}', [App\Http\Controllers\UserController::class, 'verifyToken']);
Route::get('/users/list/{permission}', [App\Http\Controllers\UserController::class, 'getUserByPermission']);
Route::post('/users/create', [App\Http\Controllers\UserController::class, 'store']);
Route::delete('/users/{id}', [App\Http\Controllers\UserController::class, 'destroy']);
Route::post('/labs/create', [App\Http\Controllers\UserController::class, 'labstore']);
Route::post('/admins/create', [App\Http\Controllers\UserController::class, 'adminstore']);
Route::post('/upload', [App\Http\Controllers\UserController::class, 'upload']);
Route::post('/pdfupload/{id}', [App\Http\Controllers\ReportController::class, 'pdfupload']);
Route::get('/findreport/{name}', [App\Http\Controllers\ReportController::class, 'findbyname']);
Route::get('/dateview/{date}', [App\Http\Controllers\ReportController::class, 'findbydate']);
Route::get('/pdfpath/{id}/{pdfname}', [App\Http\Controllers\ReportController::class, 'regpdf']);
