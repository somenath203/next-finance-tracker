const StatisticsCard = ({
  cardTitle,
  cardAmount,
  cardIcon,
  cardAmountColor,
  isCurrency,
}: {
  cardTitle: string;
  cardAmount: number;
  cardIcon: string;
  cardAmountColor: string;
  isCurrency: boolean;
}) => {

  
  let formattedCurrency: any = cardAmount;

  if(isCurrency) {

    formattedCurrency = Number(cardAmount).toLocaleString('en-US');

  };

  return <div className="flex justify-between items-center px-5 py-7 border border-solid border-gray-300 rounded-sm">


    <img src={cardIcon} alt={cardTitle} className="w-12 h-12" />


    <div className="flex flex-col items-end">

        <span className="text-gray-500 text-sm">{cardTitle}</span>

        <h1 className="text-xl lg:text-3xl font-bold" style={{ color: cardAmountColor }}>
            {isCurrency && <>Rs.</>} {formattedCurrency} 
        </h1>

    </div>


  </div>;
};

export default StatisticsCard;
