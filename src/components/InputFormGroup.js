import React from 'react';


const InputFormGroup = (props) => {
  const {
    id,
    label,
    type,
    readonly,
    value,
    onChange,
  } = props;

  return (
    <div className="form-group row">
      <label htmlFor={id} className="col-sm-4 col-form-label">{label}</label>
      <div className="col-sm-8">
        {
          readonly ?
            <input
              type={type}
              readOnly
              className="form-control-plaintext"
              id={id}
              value={value}
            /> :
            <input
              type={type}
              className="form-control"
              id={id}
              value={value}
              onChange={onChange}
            />
        }
      </div>
    </div>
  );
};

export default InputFormGroup;
