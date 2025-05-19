package store.oneul.mvc.payment.dao;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PaymentDAO {
    boolean existsByPaymentKey(String paymentKey);
}
