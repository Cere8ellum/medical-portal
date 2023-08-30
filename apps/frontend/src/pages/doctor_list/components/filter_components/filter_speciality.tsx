import styles from '../../styles/doctor_list.module.css';

interface FilterSpecialityProps {
  handleClick: (event: React.MouseEvent<HTMLElement>) => void;
  handleClose: (event: React.MouseEvent<HTMLElement>) => void;
  specialities: string[];
}

const FilterSpeciality = ({
  handleClick,
  handleClose,
  specialities,
}: FilterSpecialityProps) => {
  return (
    <div className={styles['speciality']} id="speciality">
      <div className={styles['speciality_list']}>
        {specialities.map((speciality) => {
          return (
            <a
              key={speciality}
              onClick={handleClick}
              className={`${styles['speciality_item']}`}
            >
              <img
                src="../../../assets/images/check4.png"
                alt="check"
                className={styles['speciality_item_check']}
              />
              {speciality}
            </a>
          );
        })}
      </div>
      <img
        src="../../../assets/images/chevron-up1.png"
        alt="chevron-up"
        className={styles['speciality_chevron_up']}
        onClick={handleClose}
      />
    </div>
  );
};

export default FilterSpeciality;
