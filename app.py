##Import for Front-End
from flask import Flask,jsonify
from flask import Flask, render_template, redirect, url_for, request
#Standard Imports
import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
import time as time
#Modelling Imports
from sklearn.preprocessing import StandardScaler, MinMaxScaler 
from sklearn.model_selection import train_test_split, cross_val_score 
from sklearn.linear_model import LinearRegression
from sklearn import linear_model
from sklearn import metrics
import xgboost as xgb
from xgboost import plot_importance
from sklearn.metrics import explained_variance_score, mean_squared_error, r2_score
from sklearn.neighbors import KNeighborsRegressor
from sklearn.metrics import mean_squared_error
#################################################
# Flask Setup
#################################################
app = Flask(__name__)

##define the methods to calculate everything based on entries give
@app.route("/",methods=['GET', 'POST'])
def model():
    #Import csv to fit
    final_df = pd.read_csv('C:/Users/Juan Fracisco/Desktop/Final_project/Resources/listings_cleaned.csv')
    #Take away bathrooms text
    final_df['bathrooms_text'] = final_df['bathrooms_text'].str.replace('[a-zA-Z- ]', '')
    final_df['bathrooms_text'] = pd.to_numeric(final_df['bathrooms_text'])
    final_df['bathrooms_text'].unique()
    #Dropping columns that cause issues in simulation
    final_df = final_df.drop(['time_since_first_review','time_since_last_review','host_since','review_scores_accuracy','first_review','id'],axis=1)
    dummy_df = pd.get_dummies(final_df)
    numerical_columns = ['parking','tv','beds','bedrooms','maximum_nights','gym','accommodates','air_conditioning']
    if request.method == 'POST':
        knn = KNeighborsRegressor(algorithm='brute')
        dummy_df = dummy_df.fillna(0)
        knn.fit(dummy_df[numerical_columns], dummy_df['price'])
        ##User data
        data = {numerical_columns[0]:int(request.form['parking']),
                numerical_columns[1]:int(request.form['tv']),
                numerical_columns[2]:int(request.form['beds']),
                numerical_columns[3]:int(request.form['bedrooms']),
                numerical_columns[4]:int(request.form['maximum_nights']),
                numerical_columns[5]:int(request.form['gyms']),
                numerical_columns[6]:int(request.form['accommodates']),
                numerical_columns[7]:int(request.form['air_conditioning'])}
        user_df = pd.DataFrame(data,index=[0])
        features_predictions = knn.predict(user_df)
        return render_template("index.html",text=str(features_predictions[0]))
    return render_template("index.html",text="Enter data to calculate")

if __name__ == "__main__":
    app.run(debug=True)