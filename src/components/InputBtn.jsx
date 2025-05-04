const InputBtn = (props) => {

  const handleValidation = (e) => {
    const { name, value } = e.target
    props.getData({ name, value });
  };

  return (
    <>
      <input
        type={props.type}
        placeholder={props.placeholder}
        name={props.name}
        value={props.value}
        onChange={handleValidation}
      />
    </>
  )
}

export default InputBtn;