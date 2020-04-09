#!/usr/bin/env python


import tweepy
import time
import json
from tweepy.streaming import StreamListener
from tweepy import OAuthHandler
from tweepy import Stream
from datetime import datetime
from pyredis import Client
import os 
from dotenv import load_dotenv
load_dotenv()


consumer_key = os.getenv("TWITTER_CLIENT_KEY")
consumer_secret = os.getenv("TWITTER_CLIENT_SECRET")
access_token = os.getenv("TWITTER_ACCESS_TOKEN")
access_secret = os.getenv("TWITTER_ACCESS_SECRET")

redis_host = os.getenv("REDIS_HOST")
redis_port = int(os.getenv("REDIS_PORT"))
client = Client(host=redis_host,port=redis_port)

scraper_channel = os.getenv("SCRAPER_CHANNEL")
scraper_words = os.getenv("SCRAPER_WORDS").split(',')

class StdoutListener(StreamListener):
    def on_data(self, data):
        try:            
            # tweet = json.loads(data)                    
            print(data)
            print("***********")
            client.publish(scraper_channel, data)                                 
    
            return True
        except BaseException as e:
            print('Failed'(e))

        def on_eror(self, status):
            print(status)




if __name__ == '__main__':
    l = StdoutListener()
    auth = OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_token, access_secret)
    stream = Stream(auth, l)
    stream.filter(track=['freshgraduate','kartu prakerja'])
