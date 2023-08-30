import { useEffect, useState } from 'react';
import styles from '../styles/doctor_list.module.css';
import DoctorCard, { DoctorProps } from './doctor_card';
import axios from 'axios';
//import api from 'apps/frontend/src/infrastructure/api';
import { DoctorDTO } from '../dto/doctor-dto';
import Pagination from '@mui/material/Pagination';
import FilterSpeciality from './filter_components/filter_speciality';

interface SearchField {
  speciality: string[];
  gender: 'male' | 'female' | 'all';
  type: 'adult' | 'child' | 'all';
}

const initialFilter: SearchField = {
  speciality: [],
  gender: 'all',
  type: 'all',
};

const itemsPerPage = 10;

const DoctorList = () => {
  const [doctors, setDoctors] = useState<DoctorDTO[]>([]);
  const [docFilter, setDocFilter] = useState<DoctorDTO[]>([]);
  const [specialities, setSpecialities] = useState<string[]>([]);
  const [search, setSearch] = useState<SearchField>(initialFilter);

  /**
   * pagination
   */

  const [currentItems, setCurrentItems] = useState<DoctorDTO[]>([]);
  const [pageCount, setPageCount] = useState<number>(1);
  const [page, setPage] = useState<number>(1);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  useEffect(() => {
    async function getDoctors() {
      try {
        axios
          .get('http://localhost:3000/api/doctors/all')
          .then(({ data }) => {
            setDoctors(data);
            setDocFilter(data);
          })
          .catch((error) => {});
      } catch (error) {
        console.error(error);
      }
    }

    async function getSpeciality() {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/doctors/all/specialities'
        );
        setSpecialities(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    getDoctors();
    getSpeciality();
  }, []);

  useEffect(() => {
    console.log('pаботает фильтр');
    setPageCount(Math.ceil(docFilter.length / itemsPerPage));

    const startOffset = page * itemsPerPage - itemsPerPage;
    const endOffset = startOffset + itemsPerPage;
    setCurrentItems(docFilter.slice(startOffset, endOffset));
  }, [docFilter]);

  useEffect(() => {
    console.log('смена page or pagecount');
    function setPagination() {
      const startOffset = page * itemsPerPage - itemsPerPage;
      const endOffset = startOffset + itemsPerPage;
      setCurrentItems(docFilter.slice(startOffset, endOffset));
    }
    setPagination();
  }, [page]);

  async function filter() {
    setDocFilter([]);
    if (search.gender === 'all' && search.type === 'all') {
      if (search.speciality.length === 0) {
        setDocFilter(doctors);
      } else {
        console.log('speciality', search.speciality);
        let result: DoctorDTO[] = [];
        try {
          let doctorSearch: DoctorDTO[] = [];
          doctors.forEach((doc: DoctorDTO) => {
            search.speciality.forEach((spec) => {
              if (doc.speciality === spec) {
                doctorSearch.push(doc);
              }
            });
          });
          setDocFilter(doctorSearch);
          setPage(1);
        } catch (error) {
          console.error(error);
        }
      }
    }
  }

  function handleOpen(event: React.MouseEvent<HTMLElement>) {
    const open = event.currentTarget;
    open.classList.toggle(styles['filter_speciality_open_active']);
    document
      .getElementById('speciality')
      ?.classList.toggle(styles['speciality_active']);
  }

  function handleSpeciality(event: React.MouseEvent<HTMLElement>) {
    const newField = event.currentTarget.textContent || '';
    const allSpeciality = search.speciality || [];
    const searchIndex = allSpeciality.indexOf(newField);

    if (newField && searchIndex === -1) {
      allSpeciality.push(newField);
    } else {
      allSpeciality.splice(searchIndex, 1);
    }

    setSearch((oldSearch) => ({
      ...oldSearch,
      ...{ speciality: [...allSpeciality] },
    }));
    event.currentTarget.classList.toggle(styles['active']);
    filter();
  }

  function handleCloseWindow(event: React.MouseEvent<HTMLElement>) {
    const chevron = event.currentTarget;
    document
      .getElementById('speciality')
      ?.classList.toggle(styles['speciality_active']);
    document
      .querySelector(`.${styles['filter_speciality_open']}`)
      ?.classList.toggle(styles['filter_speciality_open_active']);
  }

  function clearFilter(event: React.MouseEvent<HTMLElement>) {
    setSearch(initialFilter);
  }

  return (
    <main className={styles['doctors']}>
      <h1 className={styles['doctors_title']}>СПИСОК ВРАЧЕЙ</h1>
      <div className={`${styles['doctors_search']} ${styles['filter']}`}>
        <p className={styles['filter_title']}>Фильтр</p>
        <div className={styles['filter_speciality']}>
          <p className={styles['filter_speciality_title']}>специализация</p>
          <img
            src="../../../assets/images/chevron-down.png"
            className={styles['filter_speciality_open']}
            onClick={handleOpen}
          />
        </div>
        <FilterSpeciality
          handleClick={handleSpeciality}
          handleClose={handleCloseWindow}
          specialities={specialities}
        />
      </div>

      <div className={styles['doctors_card']}>
        {currentItems.length !== 0 ? (
          <>
            {currentItems.map((doc: DoctorDTO) => {
              return <DoctorCard key={doc.id} doctor={doc} />;
            })}
          </>
        ) : (
          <div>
            <img
              src="../../../assets/images/not_found.jpeg"
              alt="По вашему запросу ничего не найдено"
            />
            <p style={{ textAlign: 'center', fontSize: '25px' }}>
              По вашему запросу ничего не найдено
            </p>
          </div>
        )}
        <Pagination
          count={pageCount}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          color="primary"
        />
      </div>
    </main>
  );
};

export default DoctorList;
