import React, { useState } from "react";
import { Button, Alert } from "react-native";
import { PaymentWidgetProvider, usePaymentWidget, AgreementWidget, PaymentMethodWidget } from "@tosspayments/widget-sdk-react-native";
import type { AgreementWidgetControl, PaymentMethodWidgetControl } from "@tosspayments/widget-sdk-react-native";

export default function Payment() {
  return (
    <PaymentWidgetProvider clientKey={`test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm`} customerKey={`QJEphYSeCuHRQyoOxVWTT`}>
      <CheckoutPage />
    </PaymentWidgetProvider>
  );
}

function CheckoutPage() {
  const paymentWidgetControl = usePaymentWidget();
  const [paymentMethodWidgetControl, setPaymentMethodWidgetControl] = useState<PaymentMethodWidgetControl | null>(null);
  const [agreementWidgetControl, setAgreementWidgetControl] = useState<AgreementWidgetControl | null>(null);

  return (
    <>
      <PaymentMethodWidget
        selector="payment-methods"
        onLoadEnd={() => {
          paymentWidgetControl
            .renderPaymentMethods("payment-methods", { value: 50000 }, { variantKey: "DEFAULT" })
            .then((control) => {
              setPaymentMethodWidgetControl(control);
            });
        }}
      />
      <AgreementWidget
        selector="agreement"
        onLoadEnd={() => {
          paymentWidgetControl
            .renderAgreement("agreement", { variantKey: "DEFAULT" })
            .then((control) => {
              setAgreementWidgetControl(control);
            });
        }}
      />
      <Button
        title="결제요청"
        onPress={async () => {
          if (paymentWidgetControl == null || agreementWidgetControl == null) {
            Alert.alert("주문 정보가 초기화되지 않았습니다.");
            return;
          }
          const agreement = await agreementWidgetControl.getAgreementStatus();
          if (agreement.agreedRequiredTerms !== true) {
            Alert.alert("약관에 동의하지 않았습니다.");
            return;
          }
          paymentWidgetControl
            .requestPayment({
              orderId: 'oHgKnQv5EWjhGdz_VYexb',
              orderName: "토스 티셔츠 외 2건",
            })
            .then((result) => {
              if (result?.success) {
                Alert.alert("결제가 성공적으로 완료되었습니다.");
                // 결제 성공 시 처리할 비즈니스 로직을 여기에 추가
              } else if (result?.fail) {
                Alert.alert("결제가 실패하였습니다.");
                // 결제 실패 시 처리할 비즈니스 로직을 여기에 추가
              }
            });
        }}
      />
      <Button
        title="선택된 결제수단"
        onPress={async () => {
          if (paymentMethodWidgetControl == null) {
            Alert.alert("주문 정보가 초기화되지 않았습니다.");
            return;
          }
          Alert.alert(`선택된 결제수단: ${JSON.stringify(await paymentMethodWidgetControl.getSelectedPaymentMethod())}`);
        }}
      />
      <Button
        title="결제 금액 변경"
        onPress={() => {
          if (paymentMethodWidgetControl == null) {
            Alert.alert("주문 정보가 초기화되지 않았습니다.");
            return;
          }
          paymentMethodWidgetControl.updateAmount(100_000).then(() => {
            Alert.alert("결제 금액이 100,000원으로 변경되었습니다.");
          });
        }}
      />
    </>
  );
}
