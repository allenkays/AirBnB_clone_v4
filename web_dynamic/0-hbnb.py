#!/usr/bin/python3
"""Starts a Flask Web Application"""
import uuid
from os import environ
from flask import Flask, render_template
from models import storage
from models.state import State
from models.city import City
from models.amenity import Amenity
from models.place import Place

app = Flask(__name__)

@app.teardown_appcontext
def close_db(error):
    """Closes the current SQLAlchemy session"""
    storage.close()

@app.route('/0-hbnb/', strict_slashes=False)
def hbnb():
    """Displays a page with information about states, cities, amenities, and places"""
    all_states = storage.all(State).values()
    sorted_states = sorted(all_states, key=lambda state: state.name)
    state_city_list = []

    for state in sorted_states:
        state_city_list.append([state, sorted(state.cities, key=lambda city: city.name)])

    all_amenities = storage.all(Amenity).values()
    sorted_amenities = sorted(all_amenities, key=lambda amenity: amenity.name)

    all_places = storage.all(Place).values()
    sorted_places = sorted(all_places, key=lambda place: place.name)

    return render_template('0-hbnb.html',
                           states=state_city_list,
                           amenities=sorted_amenities,
                           places=sorted_places,
                           cache_id=uuid.uuid4())

if __name__ == "__main__":
    """Main function"""
    app.run(host='0.0.0.0', port=5000)
