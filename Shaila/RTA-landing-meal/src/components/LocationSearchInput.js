import React from 'react';

import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete';

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
    
          <PlacesAutocomplete
            value={this.props.locations}
            onChange={this.props.handleLocation}
            onSelect={this.props.handleSelect}
            wrapperStyle={{ position: 'relative', display: 'inline-block' }}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <input
                  {...getInputProps({
                    placeholder: 'Enter a location',
                    className: 'form-control',
                  })}

                />

                <div className="autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions.map(suggestion => {
                    const className = suggestion.active
                      ? 'suggestion-item--active'
                      : 'suggestion-item';
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                      : { backgroundColor: '#ffffff', cursor: 'pointer' };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style,
                        })}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>

    );
  }
}

export default LocationSearchInput;