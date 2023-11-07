import PropTypes from 'prop-types';

function SearchModal({ setModalOpen, htmlContent }) {
  // 모달 끄기
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'fixed',
          zIndex: 999,
          top: 0,
          left: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.05)'
        }}
        onClick={closeModal}
        role="presentation"
      ></div>
      <div
        style={{
          width: '70%',
          height: '80%',
          zIndex: 1000,
          position: 'fixed',
          top: '10%',
          left: '19%',
          display: 'flex',
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
          border: 1,
          borderRadius: 8
        }}
      >
        <button style={{ position: 'absolute', right: 10, top: 10, border: 0 }} onClick={closeModal}>
          X
        </button>

        <iframe src={`/pub_dir/${htmlContent}`} title="External HTML" style={{ width: '95%', height: '90%' }} />
      </div>
    </>
  );
}

SearchModal.propTypes = {
  setModalOpen: PropTypes.func,
  htmlContent: PropTypes.any
};

export default SearchModal;
