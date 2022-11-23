<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class base extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = "base";

    // protected $fillable = [
    // 'lat' ,
    // 'lon' ,
    // 'date',
    // ];
}
