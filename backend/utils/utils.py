import requests


def get_distance(loc1_lat,loc1_lon,loc2_lat,loc2_lon):
    url = "https://api.radar.io/v1/route/distance?origin={},{}&destination={},{}&modes=car&units=metric".format(loc1_lat,loc1_lon,loc2_lat,loc2_lon)
    
    payload ={}
    headers = {"Authorization":"prj_test_pk_a093ec8265fa68c9aaf03d7056fc35a045dc13c8"}
    response = requests.request("GET",url,headers=headers,data=payload)
    dist_in_meter=response.json().get('routes').get('car').get('distance')['value']
    return dist_in_meter

def add_geofence(name,tag,externalId,latitude,longitude):
    payload = {
        "description":name,
        "tag":tag,
        "externalId":externalId,
        "type":"circle",
        "radius":200,
        "coordinates":[longitude,latitude],
        "enabled":"true"

    }
    url = "https://api.radar.io/v1/geofences/"
    headers = {"Authorization":"prj_test_sk_bdea6662fe333d9499147a9ad130c6902b1f3882"}

    response = requests.request("POST",url,headers=headers,data=payload)
    return response

def get_geofence_near_me(latitude,longitude,tags='Public'):
    url =  "https://api.radar.io/v1/search/geofences?tags={}&near={},{}&radius=100".format(tags,latitude,longitude)
    headers = {"Authorization":"prj_test_pk_a093ec8265fa68c9aaf03d7056fc35a045dc13c8"}

    list_of_ids =[]
    response = requests.request("GET",url,headers=headers)
    for vendors in response.json().get('geofences'):
        list_of_ids.append(vendors['externalId'])

    return list_of_ids[0]