import requests


def get_distance(loc1_lat,loc1_lon,loc2_lat,loc2_lon):
    url = "https://api.radar.io/v1/route/distance?origin={},{}&destination={},{}&modes=car&units=metric".format(loc1_lat,loc1_lon,loc2_lat,loc2_lon)
    
    payload ={}
    headers = {"Authorization":"prj_test_pk_a093ec8265fa68c9aaf03d7056fc35a045dc13c8"}
    response = requests.request("GET",url,headers=headers,data=payload)
    dist_in_meter=response.json().get('routes').get('car').get('distance')['value']
    return dist_in_meter