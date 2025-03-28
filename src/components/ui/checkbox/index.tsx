import './styles.sass';

interface CheckboxProps {
    checked?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange }) => {
    return (
        <label className="ios-checkbox blue">
            <input type="checkbox" checked={checked} onChange={onChange} />
            <div className="checkbox-wrapper">
                <div className="checkbox-bg"></div>
                <svg fill="none" viewBox="0 0 24 24" className="checkbox-icon">
                    <path stroke="currentColor" d="M4 12L10 18L20 6" className="check-path"></path>
                </svg>
            </div>
        </label>
    );
};

export default Checkbox;
