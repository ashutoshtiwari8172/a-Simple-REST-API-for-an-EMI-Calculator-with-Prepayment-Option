module.exports = (sequelize, DataTypes) => {
    const Loan = sequelize.define('Loan', {
      loan_amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      interest_rate: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      loan_tenure_months: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      emi: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      prepayment_amount: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        defaultValue: null,
      },
      remaining_balance: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
    },{
        timestamps: true,  // Adds createdAt and updatedAt columns automatically

    });
  
    return Loan;
  };
  