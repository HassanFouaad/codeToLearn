import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ReactAutocomplete from "react-autocomplete";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";

const Search = (props) => {
  const [state, setState] = useState({ value: "HTML" });
  return (
    <ReactAutocomplete
      items={props.courses}
      shouldItemRender={(item, value) =>
        item.name.toLowerCase().indexOf(value.toLowerCase()) > -1
      }
      getItemValue={(item) => item._id}
      renderItem={(item, highlighted) => (
        <div
          key={item._id}
          style={{ backgroundColor: highlighted ? "#eee" : "transparent" }}
        >
          {item.name}
        </div>
      )}
      value={state.value}
      onChange={(e) => setState({ value: e.target.value })}
      onSelect={(val) => props.history.push(`/courses/${val}`)}
    />
  );
};

const mapStateToProps = (state) => ({
  courses: state.courses.courses,
});

export default withRouter(connect(mapStateToProps)(Search));
