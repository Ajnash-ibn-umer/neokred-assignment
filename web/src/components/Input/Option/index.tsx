import style from'./option.module.css'


interface OptionInterface {
  children: any;
  value: string | number;
}

const Option = ({...props}) => {
  return (
    <>
      <option className={style.option} {...props}></option>
    </>
  );
};

export default Option;