package com.ecommerceshop.module;

import co.elastic.clients.elasticsearch._types.query_dsl.MatchAllQuery;
import com.ecommerceshop.dto.document.aut.UserRole;
import com.ecommerceshop.dto.document.emp.EmpBase;
import com.ecommerceshop.dto.document.member.MemberBase;
import com.ecommerceshop.dto.document.product.ProductBase;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.Sort;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Configuration
public class CommonModule {

    public Date parsingDate(Date inputDate) {

        SimpleDateFormat inputDateFormat = new SimpleDateFormat("EEE MMM dd HH:mm:ss zzz yyyy", Locale.ENGLISH);
        inputDateFormat.setTimeZone(TimeZone.getTimeZone("Asia/Seoul"));
        SimpleDateFormat outputDateFormat = new SimpleDateFormat("yyyy-MM-dd");

        return getDateParsing(inputDate, inputDateFormat, outputDateFormat);
    }

    public Date parsingDate2(Date inputDate) {

        SimpleDateFormat inputDateFormat = new SimpleDateFormat("EEE MMM dd HH:mm:ss zzz yyyy", Locale.ENGLISH);
        inputDateFormat.setTimeZone(TimeZone.getTimeZone("Asia/Seoul"));

        SimpleDateFormat outputDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        outputDateFormat.setTimeZone(TimeZone.getTimeZone("Asia/Seoul"));
        return getDateParsing2(inputDate, inputDateFormat, outputDateFormat);
    }

    private Date getDateParsing(Date inputDate, SimpleDateFormat inputDateFormat, SimpleDateFormat outputDateFormat) {
        Date formattedDateAsDate = null;

        try {

            Date date = inputDateFormat.parse(inputDate.toString());
            String formattedDate = outputDateFormat.format(date);
            LocalDate localDate = LocalDate.parse(formattedDate);
            formattedDateAsDate = java.sql.Date.valueOf(localDate);


        } catch (ParseException e) {
            e.printStackTrace();
        }

        return formattedDateAsDate;
    }

    private Date getDateParsing2(Date inputDate, SimpleDateFormat inputDateFormat, SimpleDateFormat outputDateFormat) {

        try {

            Date date = inputDateFormat.parse(inputDate.toString());
            String formattedDate = outputDateFormat.format(date);
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

            LocalDateTime dateTime = LocalDateTime.parse(formattedDate, formatter);
            Date returnDate = java.sql.Timestamp.valueOf(dateTime);
            return returnDate;

        } catch (ParseException e) {
            e.printStackTrace();
        }

        return null;
    }

    public NativeQuery makeMatchAllQuery() {

        NativeQuery query = NativeQuery.builder()
                .withQuery(q -> q.matchAll(new MatchAllQuery.Builder().build()))
                .build();

        return query;
    }

    public NativeQuery makeSearchByKeywordsQuery(String keyword, String value, String indexId) {

        NativeQuery query = NativeQuery.builder()
                .withQuery(q -> q.bool(bool ->
                        bool.must(term -> term.match(wild -> wild.field(keyword).query(value)))))
                .withMaxResults(2000)
                .withSort(Sort.by("_score").descending())
                .build();

        return query;
    }

    public NativeQuery makeMatchPhraseQuery(String keyword, String value) {

        NativeQuery query = NativeQuery.builder()
                .withQuery(q -> q.matchPhrase(
                        cf -> cf.field(keyword).query(value)))
                .withMaxResults(1000)
                .withSort(Sort.by("_score").descending())
                .build();

        return query;
    }

    public NativeQuery makeCombineQuery(String keyCd, String keyNm, String cdKind) {

        NativeQuery query =
                NativeQuery.builder()
                        .withQuery(q -> q.combinedFields(
                                cf -> cf.fields(keyCd, keyNm).query(cdKind)))
                        .withMaxResults(10000)
                        .withSort(Sort.by("_score").descending())
                        .build();
        return query;
    }

    public List getListFromSearchHit(SearchHits<?> searchHits) {

        List resultSet = new ArrayList<>();

        for (SearchHit searchHit : searchHits) {

            if (searchHit.getIndex().equals("emp-base")) {

                EmpBase empBase = (EmpBase) searchHit.getContent();
                empBase.setBirth(parsingDate(empBase.getBirth()));
                resultSet.add(empBase);

            } else if (searchHit.getIndex().equals("user-role")) {

                UserRole userRole = (UserRole) searchHit.getContent();
                resultSet.add(userRole.getAuthorityCode());

            } else if (searchHit.getIndex().equals("product-base")) {

                ProductBase productBase = (ProductBase) searchHit.getContent();
                productBase.setCreateDate(parsingDate(productBase.getCreateDate()));
                resultSet.add(productBase);

            } else if (searchHit.getIndex().equals("member-base")) {

                MemberBase memberBase = (MemberBase) searchHit.getContent();
                memberBase.setBirth(parsingDate(memberBase.getBirth()));
                resultSet.add(memberBase);
            }

        }

        return resultSet;
    }


}
