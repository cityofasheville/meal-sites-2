import React from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

// Got this logic/idea from the website below:
// https://codesandbox.io/s/react-leaflet-description-button-o66nb?file=/src/Description.js

class ToggleViewButton extends React.Component {
  helpDiv;

  createButtonControl() {
    const MapHelp = L.Control.extend({
      onAdd: (map) => {
        const helpDiv = L.DomUtil.create("button", "");
        this.helpDiv = helpDiv;
        helpDiv.id = 'mapToggleButton';
        helpDiv.innerHTML = `<i class="${this.props.icon}" aria-hidden="true"></i> ${this.props.title}`;
        helpDiv.classList.add("btn", "btn-light", "border-dark", "button-view-toggle");
        helpDiv.addEventListener("click", this.props.toggleHandler);

        return helpDiv;
      }
    });
    return new MapHelp({ position: "topleft" });
  }

  componentDidMount() {
    const { map } = this.props;
    const listControl = this.createButtonControl();
    listControl.addTo(map);
  }

  componentWillUnmount() {
    this.helpDiv.remove();
  }

  render() {
    return null;
  }
}

function withMap(Component) {
  return function WrappedComponent(props) {
    const map = useMap();
    return <Component {...props} map={map} />;
  };
}

export default withMap(ToggleViewButton);