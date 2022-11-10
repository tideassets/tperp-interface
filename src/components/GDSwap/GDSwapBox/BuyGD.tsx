import { t } from "@lingui/macro";

import arrowIcon from "img/ic_convert_down.svg";
import BuyInputSection from "components/BuyInputSection/BuyInputSection";
import glp24Icon from "img/ic_glp_24.svg";
import { GD_DECIMALS } from "lib/legacy";
import { bigNumberify, formatAmount } from "lib/numbers";

type Props = {};

export function BuyGD(p: Props) {
  return (
    <>
      <BuyInputSection
        topLeftLabel={t`Pay: ${100}$`}
        topRightLabel={t`Balance:`}
        tokenBalance={`${formatAmount(bigNumberify(10000), 30, 4, true)}`}
        inputValue={0}
        onInputValueChange={() => null}
        showMaxButton={false}
        onClickTopRightLabel={() => null}
        onClickMax={() => null}
        balance={"0.0$"}
      />

      <div className="AppOrder-ball-container">
        <div className="AppOrder-ball">
          <img
            src={arrowIcon}
            alt="arrowIcon"
            onClick={() => {
              console.log("switch option");
            }}
          />
        </div>
      </div>

      <BuyInputSection
        topLeftLabel={t`Receive: ${100}$`}
        topRightLabel={t`Balance:`}
        tokenBalance={`${formatAmount(bigNumberify(1000), GD_DECIMALS, 4, true)}`}
        inputValue={0}
        onInputValueChange={() => null}
        balance={"0.0$"}
      >
        <div className="selected-token">
          GD <img src={glp24Icon} alt="glp24Icon" />
        </div>
      </BuyInputSection>
    </>
  );
}
