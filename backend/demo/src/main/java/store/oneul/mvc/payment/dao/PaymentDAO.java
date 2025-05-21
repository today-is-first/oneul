package store.oneul.mvc.payment.dao;

import org.apache.ibatis.annotations.Mapper;

import store.oneul.mvc.payment.dto.PaymentDTO;

@Mapper
public interface PaymentDAO {
    boolean existsByPaymentKey(String paymentKey);

    int insert(PaymentDTO dto);
}
