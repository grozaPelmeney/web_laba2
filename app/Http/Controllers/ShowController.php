<?php

namespace App\Http\Controllers;

use Illuminate\Http\Client\Request;
use Illuminate\Http\Request as HttpRequest;
use Illuminate\Support\Facades\Request as FacadesRequest;
use App\Helpers\ResponseBuilder;
use App\Models\car;
use App\Models\feature;
use App\Models\base;
use Illuminate\Support\Facades\Http;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Storage;


class ShowController extends Controller
{
    //

    
    public function showCar(HttpRequest $request)
    {
        $IDs = car::all()->pluck('id');

        $photos = [];



        $items = car::all();
        foreach($items as $item)
        {
            if(Storage::disk('local')->exists("photo/$item->id"))
            {
                $files = Storage::disk('local')->allFiles("photo/$item->id");
                $item->main_photo = env('LUMEN_URL').'storage/app/'.($files[0]);
            }
            else{
                $item->main_photo = null;
            }
            
        }
        return response()->json($items);
    }


    public function showFeature(HttpRequest $request)
    {
        return feature::all();
    }
    public function showBase(HttpRequest $request)
    {
        return base::all();
    }
    public function itemCar(HttpRequest $request)
    {
        $car_id = $request->get('id');
        $item = car::where('id',$car_id)->first();

        $files = Storage::disk('local')->allFiles("photo/$item->id");
        $item->main_photo = env('LUMEN_URL').'storage/app/'.($files[0]);

        $item->base = base::where('id',$item->id_base)->first()->name;
        $item->feature = feature::where('id',$item->id_feature)->first()->name;
        
        return $item;
    }
    
    
}
