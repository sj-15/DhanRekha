package com.SJ15.DhanRekha.Repository;

import com.SJ15.DhanRekha.Entity.GroupMember;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GroupMemberRepository extends JpaRepository<GroupMember, Long> {
    @Override
    Optional<GroupMember> findById(Long id);
}
