'use client';

export default function Loading() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#161618',
        zIndex: '99999',
        borderRadius: '10px'
      }}
    >
      <i className="fa-solid fa-loader fa-spin"></i>
    </div>
  );
}
