package com.ecommerceshop.module;

import co.elastic.clients.elasticsearch._types.query_dsl.MatchAllQuery;
import com.ecommerceshop.dto.document.aut.UserRole;
import com.ecommerceshop.dto.document.emp.EmpBase;
import com.ecommerceshop.dto.document.member.MemberBase;
import com.ecommerceshop.dto.document.product.ProductBase;
import lombok.extern.slf4j.Slf4j;
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
@Slf4j
@Configuration
public class CommonModule {

    static final String TIME_ZONE_SEOUL = "Asia/Seoul";
    static final String INDEX_SCORE = "_score";
    public Date parsingDate(Date inputDate) {

        SimpleDateFormat inputDateFormat = new SimpleDateFormat("EEE MMM dd HH:mm:ss zzz yyyy", Locale.ENGLISH);
        inputDateFormat.setTimeZone(TimeZone.getTimeZone(TIME_ZONE_SEOUL));
        SimpleDateFormat outputDateFormat = new SimpleDateFormat("yyyy-MM-dd");

        return getDateParsing(inputDate, inputDateFormat, outputDateFormat);
    }

    public Date parsingDate2(Date inputDate) {

        SimpleDateFormat inputDateFormat = new SimpleDateFormat("EEE MMM dd HH:mm:ss zzz yyyy", Locale.ENGLISH);
        inputDateFormat.setTimeZone(TimeZone.getTimeZone(TIME_ZONE_SEOUL));

        SimpleDateFormat outputDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        outputDateFormat.setTimeZone(TimeZone.getTimeZone(TIME_ZONE_SEOUL));
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
            log.trace(e.toString());
        }

        return formattedDateAsDate;
    }

    private Date getDateParsing2(Date inputDate, SimpleDateFormat inputDateFormat, SimpleDateFormat outputDateFormat) {

        try {

            Date date = inputDateFormat.parse(inputDate.toString());
            String formattedDate = outputDateFormat.format(date);
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

            LocalDateTime dateTime = LocalDateTime.parse(formattedDate, formatter);
            return java.sql.Timestamp.valueOf(dateTime);

        } catch (ParseException e) {
            log.trace(e.toString());
        }

        return null;
    }

    public NativeQuery makeMatchAllQuery() {

        return NativeQuery.builder()
                .withQuery(q -> q.matchAll(new MatchAllQuery.Builder().build()))
                .build();
    }

    public NativeQuery makeSearchByKeywordsQuery(String keyword, String value) {

        return NativeQuery.builder()
                .withQuery(q -> q.bool(bool ->
                    bool.must(term -> term.match(wild -> wild.field(keyword).query(value)))))
                .withMaxResults(2000)
                .withSort(Sort.by(INDEX_SCORE).descending())
                .build();
    }

    public NativeQuery makeMatchPhraseQuery(String keyword, String value) {

        return NativeQuery.builder()
                .withQuery(q -> q.matchPhrase(
                    cf -> cf.field(keyword).query(value)))
                .withMaxResults(1000)
                .withSort(Sort.by(INDEX_SCORE).descending())
                .build();
    }

    public NativeQuery makeCombineQuery(String keyCd, String keyNm, String cdKind) {

        return NativeQuery.builder()
                .withQuery(q -> q.combinedFields(
                    cf -> cf.fields(keyCd, keyNm).query(cdKind)))
                .withMaxResults(10000)
                .withSort(Sort.by(INDEX_SCORE).descending())
                .build();
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
