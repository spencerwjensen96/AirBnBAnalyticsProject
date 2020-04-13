# 3rd party imports
from django.shortcuts import render
import urllib
# If you are using Python 3+, import urllib instead of urllib2
from django.http import Http404
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json
import time
# my imports
from api.serializers import CampaignSerializer, PredictSerializer
from api.models import Campaign

# Wow, the beautiful views you can see here.
class Campaigns(APIView):
    @csrf_exempt
    def get(self, request, format=None):
        campaigns = Campaign.objects.all()
        if len(campaigns) > 0:
            # if len(campaigns) > 100:
            #     campaigns = Campaign.objects.filter()[:100]
            serializer = CampaignSerializer(campaigns, many=True)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class Predict(APIView):
    @csrf_exempt
    def get(self, request, format=None):
        predictions = Predict.objects.all()
        if len(predictions) > 0:
            serializer = PredictSerializer(predictions, many=True)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @csrf_exempt
    def post(self, request, format=None):
        #serializer = PredictSerializer(data=request.data)
        #if serializer.is_valid():
            #serializer.save() # add this as a prediction to our database

            # here's where we do the connection with azure
            azureData = {
                "Inputs": {
                    "input1": {
                    "ColumnNames": [
                        "Column 0",
                        "name",
                        "neighbourhood_group",
                        "neighbourhood",
                        "latitude",
                        "longitude",
                        "room_type",
                        "price",
                        "minimum_nights",
                        "number_of_reviews",
                        "calculated_host_listings_count",
                        "availability_365"
                    ],
                    "Values": [
                        [
                        "value",
                        request.data['title'],
                        request.data['neighborhood'],
                        "value",
                        "0",
                        "value",
                        request.data['roomtype'],
                        "0",
                        request.data['minimumNights'],
                        request.data['reviews'],
                        "0",
                        request.data['availability']
                        ],
                    ]
                    }
                },
                "GlobalParameters": {}
            }
            
            body = str.encode(json.dumps(azureData))
            url = 'https://ussouthcentral.services.azureml.net/workspaces/ff6ae193fb884c889b6e523dc91a4a26/services/ce433886c30b4c14839b5d9b3baff778/execute?api-version=2.0&details=true'
            api_key = '1kJu77SI+Ip81BzCGKYJTCm90JyNHB3k8wbln3ah8jBa9Uq19Jo+5HeAxQQV8GePFcyVKKGGk5YRJvT/Q8J46g=='
            headers = {'Content-Type':'application/json', 'Authorization':('Bearer '+ api_key)}
            req = urllib.request.Request(url, body, headers) 
            try:
                response = urllib.request.urlopen(req)
                result = response.read()
                print("\n\n\n")
                print(result) 
                print("\n\n\n")
                return Response(result)
            except urllib.request.HTTPError as error:
                print("The request failed with status code: " + str(error.code))
                print(error.info())
                print(json.loads(error.read()))
                return Response(error, status=status.HTTP_400_BAD_REQUEST)
        else:    
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)