from osbot_utils.type_safe.Type_Safe                                            import Type_Safe
from osbot_utils.type_safe.primitives.domains.common.safe_str.Safe_Str__Version import Safe_Str__Version
from osbot_utils.type_safe.primitives.domains.identifiers.Safe_Id               import Safe_Id
from presentation__blackhat-eu__dec-2025.config                                              import SERVICE_NAME
from presentation__blackhat-eu__dec-2025.service.info.schemas.Enum__Service_Environment      import Enum__Service_Environment
from presentation__blackhat-eu__dec-2025.service.info.schemas.Enum__Service_Status           import Enum__Service_Status
from presentation__blackhat-eu__dec-2025.utils.Version                                       import version__presentation__blackhat-eu__dec-2025

class Schema__Service__Status(Type_Safe):
    name        : Safe_Id                   = Safe_Id(SERVICE_NAME)
    version     : Safe_Str__Version         = version__presentation__blackhat-eu__dec-2025
    status      : Enum__Service_Status      = Enum__Service_Status.operational
    environment : Enum__Service_Environment = Enum__Service_Environment.local