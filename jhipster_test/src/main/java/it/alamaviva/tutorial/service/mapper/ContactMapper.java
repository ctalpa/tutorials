package it.alamaviva.tutorial.service.mapper;

import it.alamaviva.tutorial.domain.*;
import it.alamaviva.tutorial.service.dto.ContactDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Contact} and its DTO {@link ContactDTO}.
 */
@Mapper(componentModel = "spring", uses = {ContactTypeMapper.class, EmployeeMapper.class})
public interface ContactMapper extends EntityMapper<ContactDTO, Contact> {

    @Mapping(source = "contactType.id", target = "contactTypeId")
    @Mapping(source = "employee.id", target = "employeeId")
    ContactDTO toDto(Contact contact);

    @Mapping(source = "contactTypeId", target = "contactType")
    @Mapping(source = "employeeId", target = "employee")
    Contact toEntity(ContactDTO contactDTO);

    default Contact fromId(Long id) {
        if (id == null) {
            return null;
        }
        Contact contact = new Contact();
        contact.setId(id);
        return contact;
    }
}
